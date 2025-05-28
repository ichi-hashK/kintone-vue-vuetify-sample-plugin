// main.js
import { defineCustomElement } from "vue";
import MyApp from "./MyApp.vue";
import vuetify from "./vuetify";
import "vuetify/styles";

(function (PLUGIN_ID) {
  kintone.events.on("app.record.detail.show", () => {
    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    const headerElement = kintone.app.record.getHeaderMenuSpaceElement();
    if (!headerElement) return;
    const MyAppElement = defineCustomElement(MyApp, {
      plugins: [vuetify],
      shadow: true,
    });
    customElements.define("my-app", MyAppElement);
    const myAppElement = document.createElement("my-app");
    headerElement.appendChild(myAppElement);
  });
})(kintone.$PLUGIN_ID);
