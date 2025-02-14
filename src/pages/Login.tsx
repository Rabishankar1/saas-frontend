import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import isEmail from "../utils/isEmail";

const Login = () => {
  interface InputValue {
    identifier: string;
    password: string;
  }

  const [inputValue, setInputValue] = useState<InputValue>({
    identifier: "",
    password: "",
  });
  const { identifier, password } = inputValue;


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err: string) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };
  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: "bottom-left",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = isEmail(identifier)
        ? { email: identifier, password }
        : { username: identifier, password };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/login`,
        {
          ...payload,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      handleError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identifier">Username or Email</label>
          <input
            type="identifier"
            name="identifier"
            value={identifier}
            placeholder="Enter your username or email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
