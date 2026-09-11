import {
  LayoutDashboard,
  Pill,
  FileText,
  CalendarDays,
  History as HistoryIcon,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/MediReminder-heart-logo.png";
import "./Sidebar.css";

function Sidebar({ activePage }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={17} />,
      path: "/dashboard",
    },
    {
      label: "Medicines",
      icon: <Pill size={17} />,
      path: "/medicines",
    },
    {
      label: "Prescriptions",
      icon: <FileText size={17} />,
      path: "/upload-prescription",
    },
    {
      label: "Calendar",
      icon: <CalendarDays size={17} />,
      path: "/calendar",
    },
    {
      label: "History",
      icon: <HistoryIcon size={17} />,
      path: "/history",
    },
    {
      label: "Profile",
      icon: <User size={17} />,
      path: "/profile",
    },
    {
      label: "Settings",
      icon: <Settings size={17} />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-top">
        <button
          type="button"
          className="sidebar-brand"
          onClick={() => navigate("/dashboard")}
        >
          <img src={logo} alt="MediReminder" className="sidebar-logo" />

          <div className="sidebar-brand-text">
            <span>Medi</span>
            <strong>Reminder</strong>
          </div>
        </button>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`sidebar-menu-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-menu-icon">{item.icon}</span>

              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={17} />
        <span>Log Out</span>
      </button>
    </aside>
  );
}

export default Sidebar;
