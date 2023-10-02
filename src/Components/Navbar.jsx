import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";
import { useNavigate } from "react-router";
import "./Navbar.css"; // Import the CSS file

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  const SignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the sign-up page after signing out
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">Your Logo</div>
      <ul className="navbar-links">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <div className="navbar-user">
        <div className="navbar-user-info">
          <h1>{currentUser ? currentUser.email : "Guest"}</h1>
        </div>
        <button className="navbar-signout-button" onClick={SignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};
