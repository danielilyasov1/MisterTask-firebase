import { firebaseService } from './firebase.service.js'

export const taskService = {
  query,
  addTask,
}

const collection = 'task'

async function query() {
  return firebaseService.query(collection)
}
function addTask(task) {
  return firebaseService.post(collection, task)
}
