import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/createAdmin";
import CreateFaculty from "../pages/admin/createFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

const adminPath = [
  {
    index: true,
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },

  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: <CreateStudent></CreateStudent>,
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
    ],
  },
];

export default adminPath;
