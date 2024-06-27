import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ROUTE } from "./constant/route";
// import { getUserFromLocalStorage } from "./services/localStorage";
import { PrivateRoute } from "~/hoc";
import { Auth, Error404, Home } from "~/pages";
import "~/sass/_app.scss";
import { Header } from "./component/common/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path={ROUTE.AUTH} element={<Auth />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
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
