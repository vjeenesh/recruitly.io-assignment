import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import CreateCompany from "./pages/CreateCompany";
import CompanyEdit from "./pages/CompanyEdit";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import { createContext, useContext, useState } from "react";

const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoggedInContext);

  return context;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: ":cid",
        id: "company-edit",
        children: [
          {
            index: true,
            element: <CompanyDetailsPage />,
          },
          {
            path: "edit",
            element: <CompanyEdit />,
          },
        ],
      },
      {
        path: "create-company",
        element: <CreateCompany />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </ContextProvider>
  );
}

export default App;
