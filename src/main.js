import { createApp } from "vue";

import App from "./App.vue";
import monsterSlayer from "./components/monsterSlayer.vue";

const app = createApp(App);

app.component("monster-slayer", monsterSlayer);

app.mount("#app");
