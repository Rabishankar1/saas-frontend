import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { LoginUser } from "../Apis";
import ButtonLoader from "../components/ButtonLoader";

const Login = () => {
  interface InputValue {
    identifier: string;
    password: string;
  }

  const [inputValue, setInputValue] = useState<InputValue>({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const id = toast.loading("Logging in...");

    try {
      const successStatus = await LoginUser(identifier, password);
      if (successStatus) {
        toast.update(id, {
          render: "Logged in. Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        window.location.href = "/";
      } else {
        toast.update(id, {
          render: "Error logging in.",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
        <button type="submit">
          {loading ? (
            <>
              <ButtonLoader /> Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
