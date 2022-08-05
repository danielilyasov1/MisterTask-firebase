<template>
  <!-- <pre>{{ tasks }}</pre> -->
  <table v-if="tasks" >
    <thead>
      <tr>
        <th>createdAt</th>
        <th>description</th>
        <th>title</th>
        <th>importance</th>
        <th>status</th>
        <th>doneAt</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task) in tasks" :key="task">
        <td>{{task.createdAt}}</td>
        <td>{{task.description}}</td>
        <td>{{task.title}}</td>
        <td>{{task.importance}}</td>
        <td>{{task.status}}</td>
        <td>{{task.doneAt}}</td>
        <td class="actions-btn"><button @click="editTask(task)" class="edit-btn">Edit</button><button @click="removeTask(task._id)" class="delete-btn">Delete</button></td>
      </tr>
    </tbody>
  </table>
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
import { async } from '@firebase/util';
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
        createdAt: new Date(),
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
     
       this.tasks = await taskService.query()
      clearTask()
      // this.$store.dispatch({ type: 'addTask', task: this.task })
    },

    async removeTask(taskId){
      await taskService.removeTask(taskId) 
      this.tasks = await taskService.query()
    },

      async editTask(task){
      await taskService.save(task) 
      this.tasks = await taskService.query()
    },

    clearTask(){
      this.task=
      { title: "",
        description: "",
        importance: null,
        createdAt: null,
        doneAt: null,
        status: "",
      }
    }

  },
  computed: {},
  unmounted() { },
};
</script>

 <style>
 </style>