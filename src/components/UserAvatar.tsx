import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({ user }: any) => {
  //@ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };
  return (
    <div className="relative">
      <div
        className="self-center relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-600 dark:text-gray-300 uppercase">
          {user.username.charAt(0)}
        </span>
      </div>

      {isOpen && (
        <div className="overflow-hidden cursor-pointer absolute left-1/2 -translate-x-1/2 top-12 min-w-40 bg-white border! rounded-md shadow-md border-gray-700 z-50">
          <p
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
            className="text-lg font-semibold text-blue-950 min-h-8 px-3 py-2 hover:bg-gray-300"
          >
            {user.username}
          </p>
          <p className="text-sm text-gray-500 min-h-8 px-3 py-2">
            {user.email}
          </p>
          <p
            className="text-sm text-gray-800 min-h-8 px-3 py-2 hover:bg-gray-300"
            onClick={() => {
              setIsOpen(false);
              navigate("/pricing");
            }}
          >
            View Subscriptions
          </p>
          <div className="bg-red-500 text-white min-h-10 flex items-center">
            <button
              className="w-full px-2 py-1 text-sm text-white cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                Logout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
