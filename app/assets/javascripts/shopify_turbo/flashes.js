import { Toast } from '@shopify/app-bridge/actions';
import app from "shopify_turbo/app";

// convert flash messages to app bridge toasts
document.addEventListener('turbo:render', (event) => {
  var elm = document.getElementById('shopify_app_flash');
  if (elm == null) return;
  
  var flashData = JSON.parse(elm.dataset.flash || "{}");
  
  if (flashData.notice) {
    Toast.create(app, {
      message: flashData.notice,
      duration: 5000,
    }).dispatch(Toast.Action.SHOW);
  }

  if (flashData.error) {
    Toast.create(app, {
      message: flashData.error,
      duration: 5000,
      isError: true,
    }).dispatch(Toast.Action.SHOW);
  }

  elm.remove();
});

