import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error, "error");
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        } else {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong!",
            {
              position: "bottom-left",
              autoClose: 2000,
              pauseOnFocusLoss: false,
              pauseOnHover: false,
            }
          );
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("Global mutation error:", error);
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        } else {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong!",
            {
              position: "bottom-left",
              autoClose: 2000,
              pauseOnFocusLoss: false,
              pauseOnHover: false,
            }
          );
        }
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
