import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-ui/lib/theme-chalk/index.css";
import "./index.css";
import App from "@/App.vue";
import { createApp } from "vue";
import router from "./router";
import store from "@/store";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);

app.use(store);

app.mount("#app");
