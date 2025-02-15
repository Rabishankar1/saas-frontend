import axios from "axios";
import { toast } from "react-toastify";
import isEmail from "./utils/isEmail";
import { SignUpInputValue } from "./constants";

export const Logout = async () => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/logout`,
      {},
      { withCredentials: true }
    );
    toast.success(data.message, { position: "bottom-left", autoClose: 1000 });
    return data;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message, { position: "bottom-left" });
  }
};

export const LoginUser = async (identifier: string, password: string) => {
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
      toast.success(message, {
        position: "bottom-left",
      });
      return true;
    } else {
      toast.error(message, {
        position: "bottom-left",
      });
      return false;
    }
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message || "Something went wrong", {
      position: "bottom-left",
    });
    return false;
  }
};


export const SignupUser = async (inputValue: SignUpInputValue) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/signup`,
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    toast.success(data?.message, {
      position: "bottom-left",
    });
    return data?.success;
  } catch (err: any) {
    console.log(err?.response?.data?.message);
    toast.error(err?.response?.data?.message || "Something went wrong");
    return false;
  }
};
