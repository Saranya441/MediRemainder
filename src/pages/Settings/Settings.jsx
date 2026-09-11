import { useState } from "react";

import {
  Bell,
  ChevronRight,
  Clock3,
  LockKeyhole,
  LogOut,
  Moon,
  ShieldCheck,
  Smartphone,
  Trash2,
  Volume2,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import "./Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    medicineReminders: true,
    missedDoseAlerts: true,
    prescriptionReminders: true,
    vibration: true,
    sound: true,
    reminderTime: "10",
    appearance: "system",
  });

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);

    alert("Settings saved successfully.");
  };

  return (
    <div className="settings-page-layout">
      <Sidebar activePage="Settings" />

      <main className="settings-page-main">
        {/* HEADER */}

        <section className="settings-page-header">
          <div>
            <p className="settings-breadcrumb">Settings</p>

            <h1>Settings</h1>

            <p className="settings-subtitle">
              Customize reminders, notifications, appearance, and account
              preferences.
            </p>
          </div>

          <button
            type="button"
            className="settings-save-button"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </section>

        {/* MAIN GRID */}

        <section className="settings-content-grid">
          <div className="settings-main-column">
            {/* NOTIFICATIONS */}

            <div className="settings-card">
              <div className="settings-card-heading">
                <div className="settings-heading-icon">
                  <Bell size={21} />
                </div>

                <div>
                  <h2>Notifications</h2>

                  <p>Manage medicine and health alerts</p>
                </div>
              </div>

              <div className="settings-list">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-icon">
                      <Bell size={18} />
                    </div>

                    <div>
                      <h3>Medicine Reminders</h3>

                      <p>
                        Receive alerts when it is time to take your medicine.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.medicineReminders ? "active" : ""
                    }`}
                    onClick={() => handleToggle("medicineReminders")}
                    aria-label="Toggle medicine reminders"
                  >
                    <span />
                  </button>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-icon danger">
                      <Bell size={18} />
                    </div>

                    <div>
                      <h3>Missed Dose Alerts</h3>

                      <p>Get notified when a scheduled dose is missed.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.missedDoseAlerts ? "active" : ""
                    }`}
                    onClick={() => handleToggle("missedDoseAlerts")}
                    aria-label="Toggle missed dose alerts"
                  >
                    <span />
                  </button>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-icon purple">
                      <Smartphone size={18} />
                    </div>

                    <div>
                      <h3>Prescription Reminders</h3>

                      <p>
                        Receive reminders related to prescriptions and renewals.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.prescriptionReminders ? "active" : ""
                    }`}
                    onClick={() => handleToggle("prescriptionReminders")}
                    aria-label="Toggle prescription reminders"
                  >
                    <span />
                  </button>
                </div>
              </div>
            </div>

            {/* REMINDER PREFERENCES */}

            <div className="settings-card">
              <div className="settings-card-heading">
                <div className="settings-heading-icon green">
                  <Clock3 size={21} />
                </div>

                <div>
                  <h2>Reminder Preferences</h2>

                  <p>Control how medicine reminders behave.</p>
                </div>
              </div>

              <div className="settings-list">
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-icon">
                      <Volume2 size={18} />
                    </div>

                    <div>
                      <h3>Reminder Sound</h3>

                      <p>Play a sound when a medicine reminder appears.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.sound ? "active" : ""
                    }`}
                    onClick={() => handleToggle("sound")}
                    aria-label="Toggle reminder sound"
                  >
                    <span />
                  </button>
                </div>

                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-icon">
                      <Smartphone size={18} />
                    </div>

                    <div>
                      <h3>Vibration</h3>

                      <p>Vibrate your device when a reminder is triggered.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.vibration ? "active" : ""
                    }`}
                    onClick={() => handleToggle("vibration")}
                    aria-label="Toggle vibration"
                  >
                    <span />
                  </button>
                </div>

                <div className="settings-row settings-select-row">
                  <div className="settings-row-info">
                    <div className="settings-row-icon green">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <h3>Advance Reminder Time</h3>

                      <p>Notify you before the actual medicine time.</p>
                    </div>
                  </div>

                  <select
                    name="reminderTime"
                    value={settings.reminderTime}
                    onChange={handleChange}
                    className="settings-select"
                  >
                    <option value="0">At scheduled time</option>

                    <option value="5">5 minutes before</option>

                    <option value="10">10 minutes before</option>

                    <option value="15">15 minutes before</option>

                    <option value="30">30 minutes before</option>
                  </select>
                </div>
              </div>
            </div>

            {/* APPEARANCE */}

            <div className="settings-card">
              <div className="settings-card-heading">
                <div className="settings-heading-icon purple">
                  <Moon size={21} />
                </div>

                <div>
                  <h2>Appearance</h2>

                  <p>Choose how MediReminder looks.</p>
                </div>
              </div>

              <div className="settings-theme-options">
                <button
                  type="button"
                  className={`settings-theme-card ${
                    settings.appearance === "light" ? "active" : ""
                  }`}
                  onClick={() =>
                    setSettings((previous) => ({
                      ...previous,
                      appearance: "light",
                    }))
                  }
                >
                  <div className="settings-theme-preview light">
                    <div />
                    <div />
                    <div />
                  </div>

                  <span>Light</span>
                </button>

                <button
                  type="button"
                  className={`settings-theme-card ${
                    settings.appearance === "dark" ? "active" : ""
                  }`}
                  onClick={() =>
                    setSettings((previous) => ({
                      ...previous,
                      appearance: "dark",
                    }))
                  }
                >
                  <div className="settings-theme-preview dark">
                    <div />
                    <div />
                    <div />
                  </div>

                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  className={`settings-theme-card ${
                    settings.appearance === "system" ? "active" : ""
                  }`}
                  onClick={() =>
                    setSettings((previous) => ({
                      ...previous,
                      appearance: "system",
                    }))
                  }
                >
                  <div className="settings-theme-preview system">
                    <div className="settings-preview-left" />

                    <div className="settings-preview-right" />
                  </div>

                  <span>System</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}

          <aside className="settings-side-column">
            {/* SECURITY */}

            <div className="settings-side-card">
              <div className="settings-side-heading">
                <ShieldCheck size={20} />

                <h2>Privacy & Security</h2>
              </div>

              <button type="button" className="settings-action-row">
                <div className="settings-action-left">
                  <div className="settings-action-icon">
                    <LockKeyhole size={17} />
                  </div>

                  <div>
                    <strong>Change Password</strong>

                    <span>Update your account password</span>
                  </div>
                </div>

                <ChevronRight size={17} />
              </button>

              <button type="button" className="settings-action-row">
                <div className="settings-action-left">
                  <div className="settings-action-icon">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <strong>Privacy Settings</strong>

                    <span>Manage your health data privacy</span>
                  </div>
                </div>

                <ChevronRight size={17} />
              </button>
            </div>

            {/* ACCOUNT */}

            <div className="settings-side-card">
              <div className="settings-side-heading">
                <Smartphone size={20} />

                <h2>Account</h2>
              </div>

              <button type="button" className="settings-action-row">
                <div className="settings-action-left">
                  <div className="settings-action-icon logout">
                    <LogOut size={17} />
                  </div>

                  <div>
                    <strong>Log Out</strong>

                    <span>Sign out of your account</span>
                  </div>
                </div>

                <ChevronRight size={17} />
              </button>

              <button type="button" className="settings-action-row delete">
                <div className="settings-action-left">
                  <div className="settings-action-icon delete">
                    <Trash2 size={17} />
                  </div>

                  <div>
                    <strong>Delete Account</strong>

                    <span>Permanently delete your account</span>
                  </div>
                </div>

                <ChevronRight size={17} />
              </button>
            </div>

            {/* INFORMATION CARD */}

            <div className="settings-info-card">
              <div className="settings-info-icon">
                <Bell size={20} />
              </div>

              <div>
                <h3>Stay on track</h3>

                <p>
                  Keeping reminders enabled helps you stay consistent with your
                  medicine schedule.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Settings;
