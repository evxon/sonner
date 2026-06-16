import { app } from './firebase-config.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

window.createAccount = async function(){

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try{

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert('Account created.');

  }catch(error){

    alert(error.message);

  }

}

window.login = async function(){

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  }catch(error){

    alert(error.message);

  }

}

window.logout = async function(){

  await signOut(auth);

}

onAuthStateChanged(auth,(user)=>{

  if(user){

    document.getElementById('authScreen').style.display='none';
    document.getElementById('heroScreen').style.display='block';

  }else{

    document.getElementById('authScreen').style.display='block';
    document.getElementById('heroScreen').style.display='none';

  }

});
