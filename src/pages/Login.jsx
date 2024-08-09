import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase'
function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/home");
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  }  

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Chat APP!</span>
            <span className="title">Login!</span>
            <form onSubmit={handleSubmit}>
                <input type="email" name="" placeholder='email' />
                <input type="password" name="" placeholder='password' />
                <button>Sign in!</button>
                {err && <span style={{color:"red" }}>something went wrong!</span> }
            </form>
            <p>You dont have an account? <Link to ='/register'>Register</Link></p>
        </div>
        
    </div>
  )
}

export default Login

