import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css"; // Import the CSS file

export function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const Create = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, user, pass);
      alert("Created Successfully");
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-header">Sign Up</h1>
      <form onSubmit={Create} className="signup-form">
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <input type="submit" value="Sign Up" className="signup-button" />
      </form>
      <p className="signin-link">
        Already have an account?{" "}
        <button onClick={() => navigate('/')}>Sign In</button>
      </p>
    </div>
  );
}
