import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoginUser } from "../Apis";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const successStatus = await LoginUser(identifier, password);
    if (successStatus) {
      window.location.href = "/";
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
