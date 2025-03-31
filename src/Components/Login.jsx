import React, { useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import {Eye, EyeOff} from 'lucide-react'


export default function Login() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const validate = (name, value) => {
    let errMsg = "";

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errMsg = "Invalid email format";
    } else if (name === "password" && value.length < 6) {
      errMsg = "Password must be at least 6 characters";
    }

    setErr((prevErrs) => ({ ...prevErrs, [name]: errMsg }));
  };


  const showPass = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const check = async (e) => {  
    e.preventDefault()
    let newErr = {}
    Object.keys(values).forEach((type) => {
      let value = values[type]
      let newErrMsg = ""

      if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrMsg = "Invalid email format";
      } else if (type === "password" && value.length < 6) {
        newErrMsg = "Password must be at least 6 characters";
      }

      if(newErrMsg) {
        newErr[type] = newErrMsg
      }
    })

    setErr(newErr)
    if(Object.keys(newErr).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })

        const data = await response.json()
        if (response.ok) {
            navigate('/home')
          } else {
            alert(data.error);
          }

      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
    setValues({email: "", password: ""})
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
        <span className="bold-text">Log in to your account</span>
        Access your notes anytime, anywhere. Stay connected and organized with Notely.
    </div>

      
      <form className="inputs">
        {["email", "password"].map((type) => (
          <div key={type} className="input-wrapper">
            <label htmlFor={type}>
              {type.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()}
            </label>
            <div className="input-container">
            <input
              type={type === 'password' && showPassword ? "text" : type}
              id={type}
              name={type}
              value={values[type]}
              onChange={handleChange}
              className={err[type] ? "error-input" : ""}
            />
            {
              type === 'password' && (
                <button className="showIcon" onClick={showPass}>{showPassword ? <Eye className="icon" />  :  <EyeOff className="icon" />  }</button>
              )
            }
            </div>
            
            {err[type] && <p className="err-msg">{err[type]}</p>}
          </div>
        ))}
      </form>

      <button onClick={check} className="create-account">Log in</button>

      <Link to="/signup " className="sign-in link">Don't have an account?</Link>
    </div>
  );
}
