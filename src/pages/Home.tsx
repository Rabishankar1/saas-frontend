import { UserInterface } from "../constants";
import { useNavigate } from "react-router-dom";

const Home = ({ user }: { user: UserInterface }) => {
  console.log(user, "user");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (user?.subscriptionPlan) {
      case "Free":
        return (
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Welcome, {user?.username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              You are on the <b>Free</b> plan.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Upgrade to access more features.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={() => navigate("/pricing")}
            >
              Upgrade Plan 🚀
            </button>
          </div>
        );

      case "Pro":
        return (
          <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Welcome, {user?.username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              You are on the <b>Pro</b> plan.
            </p>
            <ul className="mt-4 text-gray-700 dark:text-gray-200">
              <li>✅ Access to premium features</li>
              <li>✅ Priority support</li>
            </ul>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Consider upgrading to <b>Enterprise</b> for more exclusive
              benefits.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={() => navigate("/pricing")}
            >
              Upgrade Plan 🚀
            </button>
          </div>
        );

      case "Enterprise":
        return (
          <div className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              Welcome, {user?.username}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              You are on the <b>Enterprise</b> plan.
            </p>
            <ul className="mt-4 text-gray-700 dark:text-gray-200">
              <li>🚀 Full access to all features</li>
              <li>💼 Dedicated account manager</li>
              <li>⚡ Enterprise-level support</li>
            </ul>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Enjoy your premium experience!
            </p>
          </div>
        );

      default:
        return (
          <p className="text-red-500 dark:text-red-400">
            Invalid subscription plan
          </p>
        );
    }
  };

  return (
    <>
      <div className="home_page flex rounded-2xl flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        {renderContent()}
      </div>
    </>
  );
};

export default Home;
