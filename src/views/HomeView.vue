<template>
  <pre>{{ tasks }}</pre>
  <h1>helloo</h1>
  <h1>add task</h1>
  <form @submit.prevent="addTask">
    <input v-model="task.title" type="text" placeholder="enter title"><br>
    <input v-model="task.description" type="text" placeholder="enter description"><br>
    <input v-model="task.importance" type="number" placeholder="enter importance"><br>
    <input v-model="task.status" type="text" placeholder="enter status"><br>
    <input v-model="task.doneAt" type="date" placeholder="enter deadline"><br>
    <button>add</button>
  </form>
</template>
 <script>
import { taskService } from '../service/task.service.js'
export default {

  name: 'ProjectApp',
  components: {},
  data() {
    return {
      task: {
        title: "",
        description: "",
        importance: null,
        // createdAt: new Date(),
        doneAt: null,
        status: "",
      },
      tasks: null
    };
  },
  async created() {
    this.tasks = await taskService.query()
    console.log('this.tasks', this.tasks)
  },
  methods: {
    async addTask() {
      await taskService.addTask(this.task)
      console.log('task', this.tasks)
      // clearTask
       this.tasks = await taskService.query()
      // this.$store.dispatch({ type: 'addTask', task: this.task })
    }

  },
  computed: {},
  unmounted() { },
};
</script>
 <style>
 </style>