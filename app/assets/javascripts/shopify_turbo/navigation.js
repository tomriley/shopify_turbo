import { AppLink, Redirect, NavigationMenu, History } from '@shopify/app-bridge/actions';
import app from "shopify_turbo/app";
import config from "shopify_config/navigation";

// create shopify AppLinks
for (let item of config.menuItems) {
  item.link = AppLink.create(app, {
    label: item.label,
    destination: item.destination,
  });
}

// create the navigation menu
var navigationMenu = NavigationMenu.create(app, {
  items: config.menuItems.map((item) => item.link),
});

app.subscribe(Redirect.Action.APP, function(redirectData) {
  Turbo.visit(redirectData.path);
});

document.addEventListener('turbo:load', (event) => {
  let url = new URL(event.detail.url);
  let query = url.pathname + url.search;
  const history = History.create(app);
  history.dispatch(History.Action.REPLACE, query);
});

// every turbo page visit, check if we should activate a link
document.addEventListener('turbo:load', (event) => {
  let url = new URL(event.detail.url);
  var matched = false;
  
  for (let item of config.menuItems) {
    if (url.pathname.startsWith(item.destination)) {
      // navigationMenu.set({active: item.link});
      matched = true;
    }
  }
  if (!matched) {
    //navigationMenu.set({active: undefined});
    let goto = new URLSearchParams(url.search).get("_goto");
    if (goto) {
      Turbo.visit(goto, {action: "replace"});
    }
  }
});
