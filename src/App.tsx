import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import PricingPage from "./pages/PricingPage";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const {
    data: user,
    refetch: refetchData,
    isFetching: isUserDataLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/user/current-user`,
          { withCredentials: true }
        );
        console.log(response, "response in app");
        return response?.data?.user;
      } catch (err) {
        console.log(err, "err in user auth");
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup"
        ) {
          window.location.href = "/login";
        }
        return null;
      }
    },
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchOnMount: false,
    retry: false,
    initialData: null,
  });
  return (
    <BrowserRouter>
      <div className="App min-h-full bg-white dark:bg-gray-800 transition-colors">
        <Navbar user={user} />
        <div className="p-4 sm:p-8 xl:p-12 lg:p-16">
          <Routes>
            <Route
              path="/"
              element={
                <Home user={user} isUserDataLoading={isUserDataLoading} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/pricing"
              element={
                <PricingPage
                  refetchData={refetchData}
                  user={user}
                  isUserDataLoading={isUserDataLoading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
