import {
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  logout,
} from "../../features/auth/services/auth.service";

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", path: "/profile", icon: Users },
  { label: "Attendance", path: "/attendance", icon: CalendarDays },
  { label: "Leave", path: "/leave", icon: ClipboardList },
  { label: "Expenses", path: "/expenses", icon: FileText },
  { label: "Tasks", path: "/tasks", icon: ClipboardList },
];

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">H</div>
          <div>
            <strong>HRMS</strong>
            <span>People Workspace</span>
          </div>
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-label">WORKSPACE</span>
          {navigation.map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              className={`nav-item ${location.pathname === path ? "active" : ""}`}
              onClick={() => {
                navigate(path);
                setMobileOpen(false);
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
          <span className="nav-label nav-label-spaced">MANAGE</span>
          <button className="nav-item" onClick={() => navigate("/reports")}>
            <FileText size={19} />
            <span>Reports</span>
          </button>
          <button className="nav-item" onClick={() => navigate("/settings")}>
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="avatar">
              {(user?.name?.[0] ?? "U").toUpperCase()}
            </div>
            <div>
              <strong>{user?.name ?? "User"}</strong>
              <span>{user?.role ?? "EMPLOYEE"}</span>
            </div>
          </div>
          <button className="nav-item logout-nav" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <button
            className="menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>
          <div className="topbar-search">
            <span>Search anything...</span>
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <button className="topbar-icon" aria-label="Notifications">
              <Bell size={19} />
              <i />
            </button>
            <div className="topbar-profile">
              <div className="avatar small">
                {(user?.name?.[0] ?? "U").toUpperCase()}
              </div>
              <span>{user?.name ?? "User"}</span>
            </div>
          </div>
        </header>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
