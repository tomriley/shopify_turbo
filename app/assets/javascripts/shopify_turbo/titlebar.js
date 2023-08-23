import { Turbo } from "@hotwired/turbo-rails";
import { TitleBar, Button } from '@shopify/app-bridge/actions';
import app from "shopify_turbo/app";

const startButton = Button.create(app, { label: 'Also Go Somewhere' });
startButton.subscribe('click', () => {
  Turbo.visit("/somewhere");
});

TitleBar.create(app, {
  title: "My Shopify App",
  buttons: {
    primary: startButton,
    // secondary: []
  },
});
