import { useState } from "react";

import {
  createUserWithEmailAndPassword

} from "firebase/auth";

import { app } from "../firebase/firebase";

import { auth } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";

export function SignUp() {

    const navigate = useNavigate()
    
    const [user, setUser] = useState("");
  const [pass, setPass] = useState("");




  const Create = async (e) => {

    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth,user,pass)
      alert("Created Successfully")
      navigate('/')
    } catch (err) {
      alert(err.message);
    }
  };

 

  return (
    <>
      <form onSubmit={Create}>
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
      </form>
      Already have an account
      <button onClick={()=>{
        navigate('/')
      }} >Sign in</button>
        
    </>
  );
}
