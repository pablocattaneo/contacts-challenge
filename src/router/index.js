import Vue from "vue";
import VueRouter from "vue-router";
import PcContacts from "@/components/PcContacts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Contacts",
    component: PcContacts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
