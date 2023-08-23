import { Turbo } from "@hotwired/turbo-rails";
import { TitleBar, Button } from '@shopify/app-bridge/actions';
import config from "shopify_config/navigation";
import app from "shopify_turbo/app";

if (window.shopifyTitleBar == undefined) {
  window.shopifyTitleBar = TitleBar.create(app, {
    title: "",
    buttons: {
      primary: null,
      secondary: []
    },
  });

  function createButton(item) {
    const button = Button.create(app, { label: item.label });
    button.subscribe('click', () => {
      Turbo.visit(item.destination);
    });
    return button;
  }

  document.addEventListener('turbo:load', (event) => {
    // get the current page title
    var data = document.getElementById('shopify_app_titlebar')?.dataset || {};
    var button = JSON.parse(data.buttons || "{}");
    var primary = button.primary ? createButton(button.primary) : null;
    var secondary = (button.secondary || []).map(createButton);
    window.shopifyTitleBar.set({
      title: data.title || document.title,
      buttons: {
        primary: primary,
        secondary: secondary,
      }
    });
  });
}

export default window.shopifyTitleBar;
