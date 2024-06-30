import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "~/styles/_app.scss";
import router from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.MODE === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>

      <ToastContainer
        draggable
        rtl={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        hideProgressBar
        pauseOnFocusLoss
        autoClose={3000}
        newestOnTop={false}
        position="bottom-left"
        style={{ fontSize: "var(--font-md)" }}
      />
    </>
  );
}

export default App;
