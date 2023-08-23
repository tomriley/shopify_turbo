module ShopifyTurbo
  class Engine < ::Rails::Engine
    # If you don't want to precompile these assets (e.g., you're using jsbundling),
    # you can do this in an initializer:
    #
    # config.after_initialize do
    #   config.assets.precompile -= ShopifyTurbo::Engine::PRECOMPILE_ASSETS
    # end
    PRECOMPILE_ASSETS = %w[
      shopify_turbo/app.js
      shopify_turbo/boot.js
      shopify_turbo/drive.js
      shopify_turbo/flashes.js
      shopify_turbo/navigation.js
      shopify_turbo/titlebar.js
    ].freeze

    initializer "shopify_turbo.assets" do
      if Rails.application.config.respond_to?(:assets)
        Rails.application.config.assets.precompile += PRECOMPILE_ASSETS
      end
    end

    initializer "shopify_turbo.importmap", before: "importmap" do |app|
      app.config.importmap.paths << Engine.root.join("config/importmap.rb")
    end

    initializer "shopify_turbo.action_view" do
      ActiveSupport.on_load :action_view do
        include ShopifyTurbo::Helpers
      end
    end
  end
end
