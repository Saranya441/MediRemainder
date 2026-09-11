import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import logo from "../../assets/images/MediReminder-heart-logo.png";
import registerIllustration from "../../assets/images/register-health-illustration.png";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const isEmailOrMobile = (value) => {
    const cleanValue = value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobilePattern = /^\+?[0-9]{10,15}$/;

    return emailPattern.test(cleanValue) || mobilePattern.test(cleanValue);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.identifier.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!isEmailOrMobile(formData.identifier)) {
      setError("Please enter a valid email address or mobile number.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    console.log(formData);

    navigate("/dashboard");
  };

  const handleGoogleRegister = () => {
    alert("Google authentication will be connected with the backend later.");
  };

  return (
    <div className="register-page-reference">
      <div className="register-reference-container">
        {/* LEFT */}
        <section className="register-reference-left">
          <button
            type="button"
            className="register-reference-brand"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="MediReminder" />

            <div>
              <span>Medi</span>
              <strong>Reminder</strong>
            </div>
          </button>

          <div className="register-reference-visual">
            <h2>Your Health Journey Starts Here</h2>

            <p>
              Create your account and manage your medicines, schedules and
              reminders in one place.
            </p>

            <img
              src={registerIllustration}
              alt="MediReminder health illustration"
              className="register-illustration-image"
            />

            <small>Simple Steps • Better Health</small>
          </div>
        </section>

        {/* RIGHT */}
        <section className="register-reference-right">
          <div className="register-reference-form">
            <h1>Create Your Account</h1>

            <p className="register-reference-subtitle">
              Start managing your medications with MediReminder.
            </p>

            <form onSubmit={handleRegister}>
              <div className="register-reference-field">
                <label htmlFor="fullName">Full Name</label>

                <div className="register-reference-input">
                  <User size={15} />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-reference-field">
                <label htmlFor="identifier">
                  Email Address or Mobile Number
                </label>

                <div className="register-reference-input">
                  <Mail size={15} />

                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="Enter email or mobile number"
                    value={formData.identifier}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register-reference-field">
                <label htmlFor="password">Password</label>

                <div className="register-reference-input">
                  <Lock size={15} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="register-reference-field">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div className="register-reference-input">
                  <Lock size={15} />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="register-reference-error">{error}</p>}

              <button type="submit" className="register-reference-submit">
                Create Account
              </button>

              <div className="register-reference-divider">
                <span />
                <small>or</small>
                <span />
              </div>

              <button
                type="button"
                className="register-google-button"
                onClick={handleGoogleRegister}
              >
                <span className="google-icon">G</span>
                Continue with Google
              </button>

              <div className="register-reference-login">
                <span>Already have an account?</span>

                <button type="button" onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </div>

              <p className="register-reference-terms">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
