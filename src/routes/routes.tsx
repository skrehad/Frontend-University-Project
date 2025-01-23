import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPath } from "./admin.routes";
import { facultyPath } from "./faculty.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App></App>,
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App></App>,
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyPath),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App></App>,
      </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/change-password",
    element: <ChangePassword></ChangePassword>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
export default router;
