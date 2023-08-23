module ShopifyTurbo
  module Helpers
    # Render flash data to a hidden div. A call to this helper should be included in the main
    # application layout and therefore rendered with each request.
    def turbo_flash_data
      content_tag :div, data: {turbo_temporary: "true"} do
        content_tag(:div, "", id: "shopify_app_flash", class: "hidden", data: {
          flash: {
            notice: flash[:notice],
            error: flash[:error]
          }
        })
      end
    end

    def shopify_app_titlebar(title: nil, primary: nil, secondary: [])
      content_tag(:div, "", id: "shopify_app_titlebar", class: "hidden", data: {
        title: title,
        buttons: {
          primary: primary,
          secondary: secondary
        }
      })
    end
  end
end
