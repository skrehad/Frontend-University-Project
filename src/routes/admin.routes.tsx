import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateAdmin from "../pages/admin/CreateAdmin";

// type TRoute = {
//   path: string;
//   element: ReactNode;
// };
type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
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

// export const adminRoutes = adminPath.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);

export const adminSidebarItems = adminPath.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.path}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.path}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);

export default adminPath;
