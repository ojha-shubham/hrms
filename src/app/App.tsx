import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AppShell from "../components/layout/AppShell";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="module-placeholder">
      <span className="eyebrow blue">HRMS MODULE</span>
      <h1>{title}</h1>
      <p>
        This module is ready for implementation. The workspace layout and
        authentication are already connected.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Placeholder title="My Profile" />} />
          <Route
            path="/attendance"
            element={<Placeholder title="Attendance" />}
          />
          <Route
            path="/leave"
            element={<Placeholder title="Leave Management" />}
          />
          <Route path="/expenses" element={<Placeholder title="Expenses" />} />
          <Route path="/tasks" element={<Placeholder title="Tasks" />} />
          <Route
            path="/reports"
            element={<Placeholder title="Reports & Analytics" />}
          />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
