import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  Clock3,
  FileText,
  Pill,
  PlayCircle,
} from "lucide-react";

import logo from "../../assets/images/MediReminder-heart-logo.png";
import heroIllustration from "../../assets/images/landing-health-illustration.png";

import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* HEADER */}
      <header className="landing-header">
        <div className="landing-container landing-navbar">
          <button
            type="button"
            className="landing-brand"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="MediReminder" />

            <div className="landing-brand-name">
              <span>Medi</span>
              <strong>Reminder</strong>
            </div>
          </button>

          <nav className="landing-navigation">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </nav>

          <div className="landing-header-actions">
            <button
              type="button"
              className="landing-login-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              type="button"
              className="landing-get-started-button"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="landing-hero" id="home">
          <div className="landing-container landing-hero-grid">
            <div className="landing-hero-content">
              <span className="landing-badge">Smart Medication Management</span>

              <h1>
                Stay on Track
                <br />
                with Your Health
              </h1>

              <p>
                Upload prescriptions, add medicines, set schedules and get
                timely reminders. All in one place.
              </p>

              <div className="landing-hero-buttons">
                <button
                  type="button"
                  className="landing-primary-button"
                  onClick={() => navigate("/register")}
                >
                  Get Started Free
                  <ArrowRight size={15} />
                </button>

                <a href="#how-it-works" className="landing-watch-button">
                  <PlayCircle size={16} />
                  Watch Video
                </a>
              </div>
            </div>

            <div className="landing-hero-visual">
              <div className="landing-visual-background" />

              <img
                src={heroIllustration}
                alt="MediReminder healthcare illustration"
                className="landing-health-image"
              />

              <div className="landing-floating-reminder">
                <div className="landing-reminder-icon">
                  <Clock3 size={16} />
                </div>

                <div>
                  <strong>Time to take your medicine</strong>
                  <span>Paracetamol 500mg</span>
                  <small>8:00 AM</small>
                </div>
              </div>

              <div className="landing-floating-icon landing-clock">
                <Clock3 size={20} />
              </div>

              <div className="landing-floating-icon landing-bell">
                <Bell size={19} />
              </div>

              <div className="landing-floating-icon landing-pill">
                <Pill size={19} />
              </div>
            </div>
          </div>
        </section>

        {/* REFERENCE FEATURE ROW */}
        <section className="landing-reference-features">
          <div className="landing-container landing-reference-grid">
            <article>
              <div className="landing-reference-icon">
                <Pill size={20} />
              </div>

              <strong>Add Medicines</strong>
              <span>Manually or via Prescription</span>
            </article>

            <article>
              <div className="landing-reference-icon">
                <Clock3 size={20} />
              </div>

              <strong>Set Schedules</strong>
              <span>Multiple times per day</span>
            </article>

            <article>
              <div className="landing-reference-icon">
                <Bell size={20} />
              </div>

              <strong>Get Reminders</strong>
              <span>Push notifications</span>
            </article>

            <article>
              <div className="landing-reference-icon">
                <CalendarDays size={20} />
              </div>

              <strong>Track History</strong>
              <span>Know your progress</span>
            </article>
          </div>
        </section>

        {/* FEATURES */}
        <section className="landing-features-section" id="features">
          <div className="landing-container">
            <div className="landing-section-heading">
              <span>FEATURES</span>

              <h2>Everything you need to stay on track</h2>

              <p>Simple tools designed to make medication management easier.</p>
            </div>

            <div className="landing-feature-grid">
              <article className="landing-feature-card">
                <div className="landing-feature-icon blue">
                  <Bell size={21} />
                </div>

                <h3>Smart Reminders</h3>

                <p>
                  Receive reminders when it&apos;s time to take your medicines.
                </p>
              </article>

              <article className="landing-feature-card">
                <div className="landing-feature-icon purple">
                  <FileText size={21} />
                </div>

                <h3>Prescription Upload</h3>

                <p>
                  Upload your prescription and review your medication
                  information.
                </p>
              </article>

              <article className="landing-feature-card">
                <div className="landing-feature-icon green">
                  <Pill size={21} />
                </div>

                <h3>Medicine Management</h3>

                <p>Keep your medicines, dosage and schedules organized.</p>
              </article>

              <article className="landing-feature-card">
                <div className="landing-feature-icon cyan">
                  <BarChart3 size={21} />
                </div>

                <h3>Track Progress</h3>

                <p>Review your medication history and stay consistent.</p>
              </article>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="landing-how-section" id="how-it-works">
          <div className="landing-container">
            <div className="landing-section-heading">
              <span>HOW IT WORKS</span>

              <h2>Simple. Quick. Reliable.</h2>

              <p>Start managing your medication in three simple steps.</p>
            </div>

            <div className="landing-how-grid">
              <article>
                <div className="landing-how-icon">
                  <FileText size={23} />
                </div>

                <h3>Add Your Medicines</h3>

                <p>Enter your medicines manually or upload a prescription.</p>
              </article>

              <article>
                <div className="landing-how-icon">
                  <Clock3 size={23} />
                </div>

                <h3>Set Your Schedule</h3>

                <p>Choose when each medicine needs to be taken.</p>
              </article>

              <article>
                <div className="landing-how-icon">
                  <Bell size={23} />
                </div>

                <h3>Get Reminded</h3>

                <p>Receive reminders and keep track of your medication.</p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="landing-cta-section">
          <div className="landing-container">
            <div className="landing-cta">
              <div>
                <h2>Ready to take control of your health?</h2>

                <p>Start managing your medicines with MediReminder.</p>

                <button type="button" onClick={() => navigate("/register")}>
                  Start Your Journey
                  <ArrowRight size={15} />
                </button>
              </div>

              <img src={logo} alt="" />
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer" id="about">
        <div className="landing-container landing-footer-content">
          <div>
            <img src={logo} alt="" />
            <strong>MediReminder</strong>
          </div>

          <span>Your Health • Our Priority</span>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
