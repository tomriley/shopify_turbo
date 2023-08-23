module ShopifyTurbo
  module Authenticated
    extend ActiveSupport::Concern

    included do
      before_action :set_host_param
      include ShopifyApp::EnsureHasSession
      include ShopifyTurbo::CookielessFlashes
    end

    # ugggh. if login protections redirects (renders) the redirection page, it includes js that
    # tells the appbridge to redirect the main browser window to auth. the appbridge needs this
    # myserious "host" parameter that we receive in the original iframe requrest, so the frontend
    # has to pass it to each backend request. we use a request header for this, and shove it into
    # the params hash at the start of each authenticated request.
    def set_host_param
      host = request.headers["X-Shopify-App-Host"]
      if host.present?
        params[:host] = host
      end
    end
  end
end
