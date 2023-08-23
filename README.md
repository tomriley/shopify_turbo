Setup
-----

    ./bin/importmap pin @shopify/app-bridge
    ./bin/importmap pin @shopify/app-bridge-utils


Configuring navigation items
----------------------------

Navigation items that appear in Shopify's admin sidebar (beneath the app's icon) are configured by creating ``app/javascript/shopify_config/navigation.js``:

```js
export default {
  menuItems: [
    {
      destination: "/bestsellers",
      label: "Bestsellers!"
    },
    {
      destination: "/settings",
      label: "Settings"
    },
  ]
};
```

Add the file to your importmap.rb:

    pin_all_from "app/javascript/shopify_config", under: "shopify_config"

Server-side setup
-----------------

ApplicationController should look like:

```ruby
class ApplicationController < ActionController::Base
  include ShopifyApp::EmbeddedApp
  include ShopifyTurbo::ShellRenderer
  include ShopifyTurbo::Authenticated
end
```

A shared [Rails.cache](https://guides.rubyonrails.org/caching_with_rails.html#configuration) must be configured for cookieless flashes to work.

The application layout should look something like:

```erb
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My Shopify App</title>
    <%= stylesheet_link_tag 'application' %>
    <%= javascript_importmap_tags %>
    <%= csrf_meta_tags %>
  </head>
  <body>
    <nav>
      ...
    </nav>
    <%= yield %>
    <%= turbo_flash_data %>
  </body>
</html>
```
