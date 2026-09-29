import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../auth/services/auth.service";

const stats = [
  {
    label: "Attendance",
    value: "Present",
    detail: "Today, 09:18 AM",
    icon: Clock3,
    tone: "blue",
  },
  {
    label: "Leave Balance",
    value: "12 days",
    detail: "Available this year",
    icon: CalendarDays,
    tone: "green",
  },
  {
    label: "Open Tasks",
    value: "8",
    detail: "3 due this week",
    icon: CheckCircle2,
    tone: "orange",
  },
  {
    label: "Team Members",
    value: "24",
    detail: "Across your team",
    icon: Users,
    tone: "purple",
  },
];

export default function DashboardPage() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="page-top">
        <div>
          <span className="eyebrow blue">OVERVIEW</span>
          <h1>Good morning, {user?.name ?? "there"}.</h1>
          <p>Here is what's happening across your workspace today.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => navigate("/attendance")}
        >
          <Clock3 size={17} /> Mark attendance
        </button>
      </div>

      <section className="stats-grid">
        {stats.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className="stat-card" key={label}>
            <div className={`stat-icon ${tone}`}>
              <Icon size={20} />
            </div>
            <div className="stat-content">
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </div>
            <ArrowUpRight size={17} className="stat-arrow" />
          </article>
        ))}
      </section>

      <section className="dashboard-columns">
        <article className="dashboard-card attendance-card">
          <div className="card-heading">
            <div>
              <span className="card-kicker">TODAY</span>
              <h2>Attendance</h2>
            </div>
            <button className="ghost-icon">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="attendance-status">
            <div className="status-dot" />
            <div>
              <strong>You're checked in</strong>
              <span>Since 09:18 AM</span>
            </div>
            <strong className="status-time">7h 42m</strong>
          </div>
          <div className="progress-track">
            <span />
          </div>
          <div className="attendance-meta">
            <span>Expected: 8h 30m</span>
            <button onClick={() => navigate("/attendance")}>
              View attendance <ArrowUpRight size={15} />
            </button>
          </div>
        </article>

        <article className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="card-kicker">UPCOMING</span>
              <h2>Leave & holidays</h2>
            </div>
            <button className="link-button" onClick={() => navigate("/leave")}>
              View all
            </button>
          </div>
          <div className="event-row">
            <div className="date-box">
              <strong>04</strong>
              <span>OCT</span>
            </div>
            <div>
              <strong>Casual Leave</strong>
              <span>Friday · Full day</span>
            </div>
            <span className="badge pending">Pending</span>
          </div>
          <div className="event-row">
            <div className="date-box">
              <strong>02</strong>
              <span>OCT</span>
            </div>
            <div>
              <strong>Gandhi Jayanti</strong>
              <span>Wednesday · Holiday</span>
            </div>
            <span className="badge holiday">Holiday</span>
          </div>
        </article>
      </section>

      <section className="dashboard-card quick-card">
        <div className="card-heading">
          <div>
            <span className="card-kicker">SHORTCUTS</span>
            <h2>Quick actions</h2>
          </div>
        </div>
        <div className="quick-actions">
          {[
            ["Apply for leave", "Request time off", "/leave"],
            ["Submit expense", "Add a reimbursement", "/expenses"],
            ["Update profile", "Keep your details current", "/profile"],
            ["View tasks", "Check your priorities", "/tasks"],
          ].map(([title, detail, path]) => (
            <button
              key={title}
              className="quick-action"
              onClick={() => navigate(path)}
            >
              <span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
