// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseService = {
  query,
  post,
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
  const docRef = await addDoc(collection(db, collectionName),
   task
  )
  console.log('Document written with ID: ', docRef.id)
}
