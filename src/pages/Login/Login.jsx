import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import logo from "../../assets/images/MediReminder-heart-logo.png";
import loginIllustration from "../../assets/images/login-health-illustration.png";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const isEmailOrMobile = (value) => {
    const cleanValue = value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobilePattern = /^\+?[0-9]{10,15}$/;

    return emailPattern.test(cleanValue) || mobilePattern.test(cleanValue);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your email/mobile number and password.");
      return;
    }

    if (!isEmailOrMobile(identifier)) {
      setError("Please enter a valid email address or mobile number.");
      return;
    }

    setError("");

    console.log({
      identifier,
      password,
      rememberMe,
    });

    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    alert("Google authentication will be connected with the backend later.");
  };

  return (
    <div className="login-page-reference">
      <div className="login-reference-container">
        {/* LEFT */}
        <section className="login-reference-left">
          <button
            type="button"
            className="login-reference-brand"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="MediReminder" />

            <div>
              <span>Medi</span>
              <strong>Reminder</strong>
            </div>
          </button>

          <div className="login-reference-visual">
            <h2>Welcome Back!</h2>

            <p>
              Sign in to continue to your
              <br />
              health journey.
            </p>

            <img
              src={loginIllustration}
              alt="Medicine illustration"
              className="login-illustration-image"
            />

            <small>Better Health • Brighter Tomorrow</small>
          </div>
        </section>

        {/* RIGHT */}
        <section className="login-reference-right">
          <div className="login-reference-form">
            <h1>Sign In</h1>

            <form onSubmit={handleLogin}>
              <div className="login-reference-field">
                <label htmlFor="identifier">
                  Email Address or Mobile Number
                </label>

                <div className="login-reference-input">
                  <Mail size={15} />

                  <input
                    id="identifier"
                    type="text"
                    placeholder="Enter email or mobile number"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                  />
                </div>
              </div>

              <div className="login-reference-field">
                <label htmlFor="password">Password</label>

                <div className="login-reference-input">
                  <Lock size={15} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="login-reference-options">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  Remember me
                </label>

                <button type="button">Forgot password?</button>
              </div>

              {error && <p className="login-reference-error">{error}</p>}

              <button type="submit" className="login-reference-submit">
                Login
              </button>

              <div className="login-reference-divider">
                <span />
                <small>or</small>
                <span />
              </div>

              <button
                type="button"
                className="login-google-button"
                onClick={handleGoogleLogin}
              >
                <span className="google-icon">G</span>
                Continue with Google
              </button>

              <div className="login-reference-signup">
                <span>Don&apos;t have an account?</span>

                <button type="button" onClick={() => navigate("/register")}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
