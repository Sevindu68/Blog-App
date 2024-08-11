import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { username, password } = user;

  const OnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function submitUser(e) {
    e.preventDefault();

    if (user.password === confirmPassword) {
      try {
        const response = await fetch("http://localhost:4000/register", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          Swal.fire({
            title: "Registration succesful!",
            icon: "success",
          });

          navigate("/login");
        } else {
          Swal.fire({
            title: "Registration failed",
            icon: "error",
          });
        }

        const data = await response.json();
        console.log("Success:", data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      Swal.fire({
        title: "passwords don't match!",
        icon: "error",
      });
    }
  }

  return (
    <form className="register" onSubmit={submitUser}>
      <h1>Register</h1>
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
      <input
        name="password"
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button className="reg-btn">Register</button>
    </form>
  );
};

export default Register;
