import { taskService } from "@/services/task-service.js"

export default {
  state: {
    tasks: [],

  },
  getters: {
    tasks({ tasks }) {
      return tasks
    },
  },
  mutations: {
    setTasks(state, { tasks }) {
      state.tasks = tasks
    },
    removeTask(state, { id }) {
      const idx = state.tasks.findIndex((task) => task._id === id)
      state.tasks.splice(idx, 1)
    },
    saveTask(state, { task }) {
      const idx = state.tasks.findIndex((currTask) => currTask._id === task._id)
      if (idx !== -1) state.tasks.splice(idx, 1, task)
      else state.tasks.push(task)
    },
    addTask(state, { task }) {
      state.tasks.unshift(task)
    },
  },
  actions: {
    loadTasks({ commit }) {
   
      taskService.query().then((tasks) => {
        console.log(tasks)
      })
    },
    removeTask({ commit }, { id }) {
      taskService.remove(id).then(() => {
        commit({ type: "removeTask", id })
      })
    },
    saveTask({ commit }, { task }) {
      taskService.addTask(task).then((task) => {
        commit({ type: "saveTask", task })
      })
    },
  },
}
