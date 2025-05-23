import React, { useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
export default function Signup() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState({});
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const showPass = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const validate = (name, value) => {
    let errMsg = "";

    if (!value.trim()) {
      errMsg = `${name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()} is required`;
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errMsg = "Invalid email format";
    } else if (name === "password" && value.length < 6) {
      errMsg = "Password must be at least 6 characters";
    }

    setErr((prevErrs) => ({ ...prevErrs, [name]: errMsg }));
  };


  const check = async (e) => {
    e.preventDefault()
    let newErr = {}
    Object.keys(values).forEach((type) => {
      let value = values[type]
      let newErrMsg = ""

      if (!value.trim()) {
        newErrMsg = `${type.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()} is required`;
      } else if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrMsg = "Invalid email format";
      } else if (type === "password" && value.length < 6) {
        newErrMsg = "Password must be at least 6 characters";
      }

      if (newErrMsg) {
        newErr[type] = newErrMsg
      }
    })

    setErr(newErr)
    if (Object.keys(newErr).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/add-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
        const data = await response.json();
        setValues({ fullName: "", email: "", password: "" })

        navigate("/login");

      } catch (err) {
        console.error("Error:", err)
      }

    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
    validate(name, value);
  };

  return (
    <div className="wrapper">
      <div className="app-title">Notely</div>
      <div className="texts">
        <span className="bold-text">Create a free account</span>
        Join Notely for free. Create and share unlimited notes with your friends.
      </div>

      <form className="inputs">
        {["fullName", "email", "password"].map((type) => (
          <div key={type} className="input-wrapper">
            <label htmlFor={type}>
              {type.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()}
            </label>
            <div className="input-container">
              <input
                type={type === "password" && showPassword ? "text" : type}
                id={type}
                name={type}
                value={values[type]}
                onChange={handleChange}
                className={err[type] ? "error-input" : ""}
              />
              {
                type === 'password' && (
                  <button className="showIcon" onClick={showPass}>{showPassword ? <Eye className="icon" /> : <EyeOff  className="icon" />}</button>
                )
              }
            </div>
            {err[type] && <p className="err-msg">{err[type]}</p>}
          </div>
        ))}
      </form>

      <button onClick={check} className="create-account">Create Account</button>

      <Link to="/login" className="sign-in link">Already have an account?</Link>
    </div>
  );
}
