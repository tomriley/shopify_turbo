import "shopify_turbo/app";
import "shopify_turbo/drive";
import "shopify_turbo/titlebar";
import "shopify_turbo/navigation";
import "shopify_turbo/flashes";

var data = document.getElementById('shopify_app_init').dataset;
if (data.immediatelyVisit) {
  Turbo.visit(data.immediatelyVisit, {action: "replace"});
}
