import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateAdmin from "../pages/admin/CreateAdmin";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";

export const adminPath = [
  // {
  //   index: true,
  //   name: "Dashboard",
  //   path: "/admin/dashboard",
  //   element: <AdminDashboard></AdminDashboard>,
  // },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent></CreateStudent>,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
    ],
  },
];
