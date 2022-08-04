import { createStore } from "vuex"
import taskStore from "./modules/task-store.js"


// create a store instance
export const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    taskStore,
   
  },
})