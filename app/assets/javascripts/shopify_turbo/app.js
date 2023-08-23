import { createApp } from '@shopify/app-bridge';

if (window.app == undefined) {
  var data = document.getElementById('shopify_app_init').dataset;
  
  window.app = createApp({
    apiKey: data.apiKey,
    host: data.host,
    forceRedirect: false
  });

  // stored and added a header to turbo drive requests
  // needed for login redirection page (js) to work
  window.appHost = data.host;
}

export default window.app;