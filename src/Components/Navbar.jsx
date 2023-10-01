import React from "react";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase";

import { useNavigate } from "react-router";

export const Navbar = () => {

    const navigate = useNavigate()
  const auth = getAuth(app);

  const SignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the sign-up page after signing out
      navigate('/')
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div>
      <div className="navs">
        <h1>{auth.currentUser.email}</h1>
        <button
          onClick={() => {
            navigate('/home')
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            // window.location.href = "/about";
            navigate('/about')
          }}
        >
          About
        </button>
        <button
          onClick={() => {
            // window.location.href = "/contact";
            navigate('/contact')
          }}
        >
          Contact
        </button>
      </div>
      <button onClick={SignOut}>Sign Out</button>
    </div>
  );
};
