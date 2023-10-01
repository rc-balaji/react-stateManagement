import { useState } from "react";
import "./App.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
//   onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";



export function Index() {

    const navigate = useNavigate()
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
//   const [redirectToHome, setRedirectToHome] = useState(false);
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         window.location.href = '/home'
//     } else {
//         window.location.href = '/'
//     }
// })


  const signInGL = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth,provider);
    //   setRedirectToHome(true);
    // window.location.href = '/home'
    navigate('/home')

    } catch (err) {
      alert(err.message);
    }
  };
  const signIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, user, pass);
    //   window.location.href = '/home'
      navigate('/home')
    } catch (err) {
      alert(err.message);
    }
  };

  
 
 

  return (
    <>
    {/* <h1>{console.log(auth.currentUser.email)}</h1> */}
      <form onSubmit={signIn}>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          required
        />
        <input type="submit" value="Sign In" />

        <button onClick={signInGL}>Google</button>
      </form>
        <button onClick={()=>{
            navigate('/signup')
        }}>Sign Up</button>
    </>
  );
}
