import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://ai-fsd-mse-2.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      
      <div className="auth-box">
        <h2>Login</h2>

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

        <button onClick={login}>Login</button>

        <p onClick={()=>window.location="/register"}>
          Create Account
        </p>
      </div>

    </div>
  );
}