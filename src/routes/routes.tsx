import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routesGenerator";
import adminPath from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: routeGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: routeGenerator(adminPath),
  },
  {
    path: "/student",
    element: <App></App>,
    children: routeGenerator(adminPath),
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
export default router;
