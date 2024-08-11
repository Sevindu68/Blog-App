import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from 'sweetalert2'

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;
  const navigate = useNavigate();
  const {setUserInfo}=useContext(UserContext)
  const OnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        Swal.fire({
          title: "Login successful!",
          text: "Welcome back.",
          icon: "success"
        });
        navigate("/");
      });

      
    } else {
    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed!",
      });
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        name="username"
        type="text"
        placeholder="username"
        value={username}
        onChange={OnChange}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={OnChange}
      />
      <button className="log-btn">Login</button>
    </form>
  );
};

export default Login;
