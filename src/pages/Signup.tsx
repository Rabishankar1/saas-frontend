import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { SignupUser } from "../Apis";
import { SignUpInputValue } from "../constants";
import ButtonLoader from "../components/ButtonLoader";

const Signup = () => {
  const [inputValue, setInputValue] = useState<SignUpInputValue>({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const { email, password, username } = inputValue;
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
    const id = toast.loading("SIgning up...");
    try {
      const successStatus = await SignupUser(inputValue);
      console.log(successStatus, "successStatus");
      if (successStatus) {
        toast.update(id, {
          render: "Signed up. Redirecting...",
          type: "success",
          isLoading: false,
        });
        window.location.href = "/";
      } else {
        toast.update(id, {
          render: "Error signing up.",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.update(id, {
        render: "Error signing up.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
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
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
