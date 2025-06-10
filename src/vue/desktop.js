import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import MyApp from "./MyApp.ce.vue";
import MyView from "./MyView.ce.vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

// ✅ Shadow DOMにだけスタイルを入れる関数！
function injectVuetifyCSSTo(shadowRoot) {
  const vuetifyStyle = document.createElement("link");
  vuetifyStyle.rel = "stylesheet";
  vuetifyStyle.href =
    "https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css";
  shadowRoot.appendChild(vuetifyStyle);

  const mdiIcons = document.createElement("link");
  mdiIcons.rel = "stylesheet";
  mdiIcons.href =
    "https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css";
  shadowRoot.appendChild(mdiIcons);
}

((PLUGIN_ID) => {
  kintone.events.on("app.record.detail.show", () => {
    const header = kintone.app.record.getHeaderMenuSpaceElement();
    if (!header) return;

    const wrapper = document.createElement("div");
    const shadowRoot = wrapper.attachShadow({ mode: "open" });
    header.appendChild(wrapper);

    injectVuetifyCSSTo(shadowRoot);

    const mountPoint = document.createElement("div");
    shadowRoot.appendChild(mountPoint);

    createApp(MyApp).use(vuetify).mount(mountPoint);
  });

  kintone.events.on("app.record.index.show", (event) => {
    if (event.viewId !== 8238972) {
      // 作成したカスタマイズビューのIDを指定
      return event;
    }
    // const wrapper = document.createElement("div");
    // const shadowRoot = wrapper.attachShadow({ mode: "open" });
    // header.appendChild(wrapper);

    // injectVuetifyCSSTo(shadowRoot);

    // const mountPoint = document.createElement("div");
    // shadowRoot.appendChild(mountPoint);

    createApp(MyView).use(vuetify).mount("#app");
  });
})(kintone.$PLUGIN_ID);
