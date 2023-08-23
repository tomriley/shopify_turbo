module ShopifyTurbo
  module CookielessFlashes
    extend ActiveSupport::Concern

    included do
      after_action :save_flashes_to_cache
      before_action :retrieve_flashes_from_cache
    end

    def save_flashes_to_cache
      # We only want to do this if we are using jwt user sessions (cookieless environment)
      return unless jwt_shopify_domain.present?
      # if we are redirecting and we have flash messages, save them to the cache
      # because cookies aren't necessarily available to us in an embedded iframe
      if response.redirect? && !flash.empty?
        fid = SecureRandom.hex(10)
        # save the flash messages to the cache
        key = "flash-#{fid}"
        Rails.cache.write(key, flash.to_hash, expires_in: 10.minutes)
        raise "flash cache not working!" unless Rails.cache.read(key).present?
        # add flash_id as a param so we can retrieve it later
        response.location = response.location + "#{response.location.include?("?") ? "&" : "?"}fid=#{fid}"
      end
    end

    def retrieve_flashes_from_cache
      # if we have a flash_id param
      if params[:fid].present? && request.get?
        key = "flash-#{params[:fid]}"
        Rails.cache.read(key)&.each do |key, value|
          flash[key] = value
        end
        Rails.cache.delete(key)
      end
    end
  end
end