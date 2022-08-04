// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection, addDoc , doc, deleteDoc ,updateDoc  } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseService = {
  query,
  post,
  remove,
  _save,
  put
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBu4Dz1Crmuu7RvdR_0rCE78NYNFosNcKA',
  authDomain: 'mistertaskerfirebase.firebaseapp.com',
  projectId: 'mistertaskerfirebase',
  storageBucket: 'mistertaskerfirebase.appspot.com',
  messagingSenderId: '294806280637',
  appId: '1:294806280637:web:0102e74ca896ec15569ad4',
  measurementId: 'G-G1HH7RE4PY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

async function query(collectionName) {
  try {
    const taskSnapshot = await getDocs(collection(db, collectionName))
    console.log('taskSnapshot', taskSnapshot)
    return taskSnapshot.docs.map((doc) => {
      return {
        _id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }
    })
  } catch (e) {
    console.log('Error geting documents', e)
  }
}

async function post(collectionName, task) {
  // Add a new document with a generated id.
  try{
  const docRef = await addDoc(collection(db, collectionName),
   task
  )
  console.log('Document written with ID: ', docRef.id)
} catch (e) {
  console.log('Error adding documents', e)

}
}

async function remove(collectionName, taskId) {
  try{
    await deleteDoc(doc(db, collectionName, taskId))
    console.log('docRefRemove')

  } catch(e) {
    console.log('Error removing documents', e)
  }
}

async function put(collectionName, task) {
  try{
    await updateDoc(doc(db, collectionName, task))
    
  } catch (e) {
    console.log('Error updating documents', e)

  }
}

//need to check
async function _save(collectionName, task) {
  taskService.setItem(collectionName, JSON.stringify(task))
}
async function saveTask(collectionName, task) {
  if (task._id) {
      try {
          const docRef = doc(db, collectionName, task._id)
          const tempId = task._id
          delete task._id
          await updateDoc(docRef, task)
          return { _id: tempId, ...task }
      } catch (error) {
          console.log('Had an update error', error)
          throw (error)
      }
  } else {
      try {
          const res = await addDoc(collection(db, collectionName), task)
          const resTask = await getTaskById(collectionName,res.id)
          return resTask
      } catch (error) {
          console.log('Had an add error', error)
          throw (error)
      }
  }
}

async function getTaskById(collectionName, id) {
  const docRef = doc(db, collectionName, id)
  try {
      const docSnap = await getDoc(docRef)
      return { _id: docSnap.id, ...docSnap.data() }
  } catch (error) {
      console.log('Had an getById error', error)
      throw (error)
  }
}

function getEmptyEntity() {
  return {
      title: '',
      description: '',
      importance: 1,
      createdAt: Date.now(),
      doneAt: null,
      status: ''
  }
}