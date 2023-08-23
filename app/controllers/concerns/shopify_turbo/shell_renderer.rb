module ShopifyTurbo
  # Purpose: Intercept regular non-authed, and render the embedded app shell instead. The shell
  # bootstraps the embedded app, bringing up the app-bridge and then redirecting to the
  # original application path.
  module ShellRenderer
    extend ActiveSupport::Concern

    included do
      before_action :embedded_always_renders_shell
    end

    def embedded_always_renders_shell
      if params[:embedded] == "1"
        if scopes_mismatch?
          fullpage_redirect_to("/login?shop=#{current_shopify_domain}")
          return
        end

        @shop_origin = current_shopify_domain
        @host = params[:host]
        @immediately_visit = request.path
        render template: "application/shell", layout: "embedded_app"
      end
    end

    private

    def scopes_mismatch?
      ShopifyApp.configuration.shop_access_scopes_strategy.update_access_scopes?(current_shopify_domain)
    end
  end
end