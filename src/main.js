import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import translator from "./helper/translator.js";

import "./style.css";

const app = createApp(App);

app.use(router);

const { t, change, l } = translator("PL");

app.provide("t", t);
app.provide("change", change);
app.provide("lang", l);

app.mount("#app");
