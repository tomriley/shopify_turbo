import { Turbo } from "@hotwired/turbo-rails";
import { getSessionToken } from "@shopify/app-bridge-utils";
import app from "shopify_turbo/app";

Object.defineProperty(Turbo.PageRenderer.prototype, "trackedElementsAreIdentical", {
	get: function() {
    var appChanged = this.currentHeadSnapshot.trackedElementSignature != this.newHeadSnapshot.trackedElementSignature;
    // TODO: avoid automatic refresh of iframe when app is redeployed.
    //
    // Turbo looks at tracked head elements to determine if a full page reload would be a good idea.
    // It may be good to always return true from this getter to avoid turbo from automatically
    // reloading the iframe when the app is redeployed. A reload won't bring the app bridge back up.
    //
    // Some shopify_app gem functionality may break if we always return true from this getter (e.g.
    // redirect page) but that requires further testing.
    //
    // So, we might want to somehow detect if it's an app page that we're visiting, set an "app was
    // redeployed" flag (to inform the user), and then return true from this getter to avoid a refresh.
		return !appChanged;
	}
});

// TODO: investigate if something like below is required:
// See: https://github.com/Shopify/turolinks-jwt-sample-app/blob/master/app/javascript/shopify_app/shopify_app.js
// document.addEventListener("turbolinks:render", function () {
//   $("form, a[data-method=delete]").on("ajax:beforeSend", function (event) {
//     const xhr = event.detail[0];
//     xhr.setRequestHeader("Authorization", "Bearer " + window.sessionToken);
//   });
// });

// Add shopify session token to all of turbo's fetch requests
document.addEventListener("turbo:before-fetch-request", async (event) => {
  event.preventDefault();
  const token = await getSessionToken(app);
  event.detail.fetchOptions.headers["Authorization"] = `Bearer ${token}`;
  // The original "host" parameter is needed for possible redirect to reauth to work
  // event.detail.fetchOptions.headers["X-Shopify-App-Host"] = window.appHost;
  event.detail.resume();
});


