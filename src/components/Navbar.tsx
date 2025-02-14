import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Switcher from "./Switcher";
import UserAvatar from "./UserAvatar";

const Navbar = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="z-40 h-16 sticky top-0 right-0 left-0 bg-gray-800 dark:bg-white text-white dark:text-black transition-colors px-4">
      <div className="mx-auto flex justify-between items-center h-full">
        <div
          onClick={() => navigate("/")}
          className="font-bold text-xl cursor-pointer"
        >
          Subscription based SAAS Template
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {user && (
            <button
              onClick={() => navigate("/pricing")}
              className={`cursor-pointer px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                user?.subscriptionPlan === "Free"
                  ? "bg-gray-600 hover:bg-gray-700"
                  : user?.subscriptionPlan === "Pro"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors duration-200`}
            >
              {user?.subscriptionPlan}
            </button>
          )}
          {user && <UserAvatar user={user} />}
          <Switcher />
        </div>

        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-900 dark:bg-white text-white dark:text-black flex flex-col items-center gap-4 py-4 shadow-md">
          {user && (
            <button
              onClick={() => {
                navigate("/pricing");
                setMenuOpen(false);
              }}
              className={`cursor-pointer px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                user?.subscriptionPlan === "Free"
                  ? "bg-gray-600 hover:bg-gray-700"
                  : user?.subscriptionPlan === "Pro"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-colors duration-200`}
            >
              {user?.subscriptionPlan}
            </button>
          )}
          {user && <UserAvatar user={user} />}
          <Switcher />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
