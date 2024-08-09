import React from 'react'
import {useState} from 'react'
import AddAvatar from '../img/addAvatar.gif'
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth"
import {auth,storage,db} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from 'firebase/firestore'
import { Link,Navigate, useNavigate } from 'react-router-dom'
function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

  try {
    const res = await createUserWithEmailAndPassword(auth,email,password);

    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on( 
      (error) => {
        console.error("Upload error:", error);
        setErr(true);
      }, 
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db,"userChats", res.user.uid),{})
          alert("User registered and profile updated.");
          navigate('/home')
        } catch (error) {
          console.error("Error updating profile or Firestore:", error);
          setErr(true);
        }
      }
    );
   
  } catch (error) {
        console.log(error);
        setErr(true);
        
      }
  

};

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Chat App!</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder='display name' />
                <input type="email"  placeholder='email' />
                <input type="password"  placeholder='password' />
                <input style={{display:"none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={AddAvatar} alt="Avatar" />
                    <span>Add an Avatar</span>
                </label>

                <button>Sign in!</button>
            </form>
            <p>You have an account? <Link to ='/login'>Login</Link>!</p>
        </div>
        
    </div>
  )
}

export default Register