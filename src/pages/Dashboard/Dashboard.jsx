import {
  Bell,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Pill,
  FileText,
  CalendarDays,
  History as HistoryIcon,
  Heart,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="dashboard-page">
      <Sidebar activePage="Dashboard" />

      <main className="dashboard-main">
        {/* Header */}

        <header className="dashboard-header">
          <div>
            <h1>
              Good Morning, John! <span>👋</span>
            </h1>

            <p>Here&apos;s your medication summary for today.</p>
          </div>

          <div className="dashboard-user-area">
            <button type="button" className="notification-button">
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>
            <div className="dashboard-profile-wrapper">
              <button
                type="button"
                className="dashboard-profile-button"
                onClick={() => setIsProfileOpen((previous) => !previous)}
              >
                <div className="dashboard-profile-avatar">S</div>

                <div className="dashboard-profile-text">
                  <strong>Saranya</strong>
                  <span>Patient</span>
                </div>

                <span
                  className={`dashboard-profile-arrow ${
                    isProfileOpen ? "open" : ""
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {isProfileOpen && (
                <div className="dashboard-profile-dropdown">
                  <div className="dashboard-dropdown-user">
                    <div className="dashboard-dropdown-avatar">S</div>

                    <div>
                      <h4>Saranya</h4>
                      <p>saranya@example.com</p>
                    </div>
                  </div>

                  <div className="dashboard-dropdown-divider" />

                  <button
                    type="button"
                    className="dashboard-dropdown-item"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                  >
                    My Profile
                  </button>

                  <button
                    type="button"
                    className="dashboard-dropdown-item"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/settings");
                    }}
                  >
                    Settings
                  </button>

                  <div className="dashboard-dropdown-divider" />

                  <button
                    type="button"
                    className="dashboard-dropdown-item dashboard-dropdown-logout"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/login");
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Summary cards */}

        <section className="dashboard-summary-grid">
          <article className="summary-card">
            <span className="summary-label">Today&apos;s Medicines</span>

            <strong className="summary-value">3</strong>

            <div className="summary-footer success-text">
              <CheckCircle2 size={14} />
              <span>2 taken</span>

              <span className="summary-divider">•</span>

              <span className="muted-text">1 pending</span>
            </div>
          </article>

          <article className="summary-card">
            <span className="summary-label">Adherence Rate</span>

            <strong className="summary-value">67%</strong>

            <div className="summary-footer success-text">
              <span>+12% than last week</span>
            </div>
          </article>

          <article className="summary-card">
            <span className="summary-label">Next Dose</span>

            <strong className="summary-value">2:00 PM</strong>

            <div className="summary-footer muted-text">Vitamin D 1000 IU</div>
          </article>

          <article className="summary-card">
            <span className="summary-label">Active Prescriptions</span>

            <strong className="summary-value">1</strong>

            <button type="button" className="summary-link">
              View Details
            </button>
          </article>
        </section>

        {/* Main dashboard */}

        <section className="dashboard-content-grid">
          {/* Schedule */}

          <article className="dashboard-panel schedule-panel">
            <div className="panel-heading">
              <h2>Today&apos;s Schedule</h2>

              <button
                type="button"
                className="panel-link"
                onClick={() => navigate("/calendar")}
              >
                View Calendar
              </button>
            </div>

            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-status-icon taken">
                  <CheckCircle2 size={16} />
                </div>

                <div className="schedule-time">08:00 AM</div>

                <div className="schedule-medicine">Paracetamol 500mg</div>

                <span className="status-badge taken">Taken</span>
              </div>

              <div className="schedule-item">
                <div className="schedule-status-icon pending">
                  <Clock3 size={16} />
                </div>

                <div className="schedule-time">01:00 PM</div>

                <div className="schedule-medicine">Vitamin D 1000 IU</div>

                <span className="status-badge pending">Pending</span>
              </div>

              <div className="schedule-item">
                <div className="schedule-status-icon upcoming">
                  <Clock3 size={16} />
                </div>

                <div className="schedule-time">08:00 PM</div>

                <div className="schedule-medicine">Amoxicillin 250mg</div>

                <span className="status-badge upcoming">Upcoming</span>
              </div>
            </div>
          </article>

          {/* Right column */}

          <div className="dashboard-right-column">
            <article className="dashboard-panel quick-actions-panel">
              <div className="panel-heading">
                <h2>Quick Actions</h2>
              </div>

              <div className="quick-actions-grid">
                <button
                  type="button"
                  className="quick-action"
                  onClick={() => navigate("/add-medicine")}
                >
                  <span className="quick-icon blue">
                    <Plus size={18} />
                  </span>

                  <span>Add Medicine</span>
                </button>

                <button
                  type="button"
                  className="quick-action"
                  onClick={() => navigate("/upload-prescription")}
                >
                  <span className="quick-icon purple">
                    <FileText size={18} />
                  </span>

                  <span>Upload Prescription</span>
                </button>

                <button
                  type="button"
                  className="quick-action"
                  onClick={() => navigate("/history")}
                >
                  <span className="quick-icon pink">
                    <HistoryIcon size={18} />
                  </span>

                  <span>View History</span>
                </button>

                <button
                  type="button"
                  className="quick-action"
                  onClick={() => navigate("/calendar")}
                >
                  <span className="quick-icon cyan">
                    <CalendarDays size={18} />
                  </span>

                  <span>Calendar</span>
                </button>
              </div>
            </article>

            <article className="health-card">
              <div className="health-card-content">
                <span>Your Health Matters</span>

                <p>Stay consistent. Stay healthy.</p>
              </div>

              <div className="health-icon">
                <Heart size={34} />
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
