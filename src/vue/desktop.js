import "vuetify/styles"; // ←これ忘れがち！超重要！！
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import MyApp from "./MyApp.vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

((PLUGIN_ID) => {
  kintone.events.on("app.record.detail.show", () => {
    const headerElement = kintone.app.record.getHeaderMenuSpaceElement();
    if (!headerElement) return;

    createApp(MyApp).use(vuetify).mount(headerElement);
  });
})(kintone.$PLUGIN_ID);
