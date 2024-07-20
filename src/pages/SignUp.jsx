

import { auth } from "../firebase-config/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import axios from "axios";
import GoogleButton from "react-google-button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
     const customersData = await axios.get("https://culture-festival-new-default-rtdb.europe-west1.firebasedatabase.app/users/customers.json"

      )
      console.log(customersData.data);

      await axios.put(
        `https://culture-festival-new-default-rtdb.europe-west1.firebasedatabase.app/users/customers/${customersData.data.length}.json`,
        {
          active: true,
          email: registerEmail,
          isDeleted: false,
          name: registerName,
          password: registerPassword,
          role: "Customer"
        }
      );

      sessionStorage.setItem("register",customersData.data.length);

      console.log("User successfully registered:", userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const customersData = await axios.get("https://culture-festival-new-default-rtdb.europe-west1.firebasedatabase.app/users/customers.json"

      )
      console.log(customersData.data);

      await axios.put(
        `https://culture-festival-new-default-rtdb.europe-west1.firebasedatabase.app/users/customers/${customersData.data.length}.json`,
        {
          active: true,
          email: user.email,
          isDeleted: false,
          name: user.displayName,
          role: "Customer"
        }
      );
    
      sessionStorage.setItem("register",customersData.data.length);

      console.log("User signed in with Google:", user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h3> Register User </h3>
      <input
        id="RrgName"
        placeholder="Name..."
        value={registerName}
        onChange={(event) => setRegisterName(event.target.value)}
      />
      <input
        id="RrgEmail"
        placeholder="Email..."
        value={registerEmail}
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <input
        id="RrgPassword"
        placeholder="Password..."
        type="password"
        value={registerPassword}
        onChange={(event) => setRegisterPassword(event.target.value)}
      />
      <button onClick={register}> Create User</button>
      <GoogleButton onClick={handleGoogleSignUp} />
      <div className="links">
        
        <Link to="/Login">
        <p>You already have an account</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

