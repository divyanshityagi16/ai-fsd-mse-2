import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "https://ai-fsd-mse-2.onrender.com/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");
      window.location = "/";

    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      
      <div className="auth-box">
        <h2>Register</h2>

        <input 
          type="text"
          placeholder="Enter name"
          onChange={e=>setName(e.target.value)}
        />

        <input 
          type="email"
          placeholder="Enter email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Enter password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <p onClick={()=>window.location="/"}>
          Already have an account? Login
        </p>
      </div>

    </div>
  );
}