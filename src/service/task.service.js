import { firebaseService } from './firebase.service.js'

export const taskService = {
  query,
  addTask,
  removeTask,
  save
}

const collection = 'task'

async function query() {
  return firebaseService.query(collection)
}
function addTask(task) {
  return firebaseService.post(collection, task)
}
function removeTask(taskId) {
    return firebaseService.remove(collection, taskId)
}  
function save(task) {
    if (task.id) return firebaseService.put(collection, task)
    else return firebaseService.post(collection, task)
}