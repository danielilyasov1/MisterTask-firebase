import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu4Dz1Crmuu7RvdR_0rCE78NYNFosNcKA",
  authDomain: "mistertaskerfirebase.firebaseapp.com",
  projectId: "mistertaskerfirebase",
  storageBucket: "mistertaskerfirebase.appspot.com",
  messagingSenderId: "294806280637",
  appId: "1:294806280637:web:0102e74ca896ec15569ad4",
  measurementId: "G-G1HH7RE4PY"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'tasks')

// get collection data when page is loaded.
window.addEventListener('load', onInit)

function onInit() {
  // real-time collection data
  onSnapshot(colRef, (snapshot) => {
    console.log('snapshot :>>', snapshot)
    const tasks = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
    _renderTasksTable(tasks)
  })
  // getting the collection - not-real-time way:
  // getDocs(colRef)
  //   .then((snapshot) => {
  //     const tasks = snapshot.docs.map((doc) => {
  //       return { id: doc.id, ...doc.data() }
  //     })
  //     _renderTasksTable(tasks)
  //   })
  //   .catch((err) => console.error(err))
}

// adding docs
const addTaskForm = document.querySelector('.add')

addTaskForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  addDoc(colRef, {
    title: addTaskForm.title.value,
    author: addTaskForm.author.value,
  })
    .then(() => {
      addTaskForm.reset()
    })
    .catch((err) => {
      console.log('err :>> ', err)
    })
})

// deleting docs
const deleteTaskForm = document.querySelector('.delete')

deleteTaskForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const docRef = doc(db, 'tasks', deleteTaskForm.id.value)
  deleteDoc(docRef)
    .then(() => {
      console.log('task was successfully deleted.')
      deleteTaskForm.reset()
    })
    .catch((err) => {
      console.log('err :>> ', err)
    })
})

// update docs
const updateTaskForm = document.querySelector('.update')

updateTaskForm.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  const docRef = doc(db, 'tasks', updateTaskForm.id.value)
  const docSnap = await getDoc(docRef)

  updateDoc(docRef, {
    ...docSnap.data(),
    title: updateTaskForm.title.value
  })
  .then(() => {
    console.log('task was successfully updated.')
    updateTaskForm.reset()
  })
  .catch((err) => {
    console.log('err :>> ', err)
  })
})

document.querySelector('.tasks-btn').addEventListener('click', toggleTasks)
function toggleTasks() {
  const elContainer = document.querySelector('.tasks-container')
  const elButton = document.querySelector('.tasks-btn')
  elContainer.classList.toggle('show')
  elButton.innerText = elContainer.classList.contains('show') ? 'Hide Tasks' : 'Show Tasks'
}

function _renderTasksTable(tasks) {
  const strHTML = tasks
    .map((task) => {
      return `<tr>
                <td data-label="id">${task.id}</td>
                <td data-label="title">${task.title}</td>
                <td data-label="author">${task.author}</td>
              </tr>`
    })
    .join('')
  document.querySelector('.tasks-table').innerHTML = strHTML
}

// Auth:
const provider = new GoogleAuthProvider();
const auth = getAuth();

const elLoginBtn = document.querySelector('.login-btn')

elLoginBtn.addEventListener('click', onSignInWithGoogle)
function onSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('user', user);
      _renderLoggedUser(user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const elUserImg = document.querySelector('.user-img')
function _renderLoggedUser(user) {
  console.log('user', user?.reloadUserInfo?.photoUrl);
  elUserImg.setAttribute('src', user.reloadUserInfo.photoUrl)
  elUserImg.hidden = false
  elLoginBtn.hidden = true
}
