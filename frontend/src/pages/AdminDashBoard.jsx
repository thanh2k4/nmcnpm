import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSideBar";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
