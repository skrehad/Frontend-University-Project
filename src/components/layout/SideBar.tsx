import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/features/hooks";
import { adminPath } from "../../routes/admin.routes";
import { facultyPath } from "../../routes/faculty.routes";
import { studentPath } from "../../routes/student.routes";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  console.log(user);

  let sidebarItems;

  if (user && "role" in user) {
    switch (user!.role) {
      case userRole.ADMIN:
        sidebarItems = sidebarItemsGenerator(adminPath, userRole.ADMIN);
        break;
      case userRole.FACULTY:
        sidebarItems = sidebarItemsGenerator(facultyPath, userRole.FACULTY);
        break;
      case userRole.STUDENT:
        sidebarItems = sidebarItemsGenerator(studentPath, userRole.STUDENT);
        break;

      default:
        break;
    }
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
