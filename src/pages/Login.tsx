import {
  useState,
  type FormEvent,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    login,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  /*
   * If the user is already authenticated,
   * don't show the login page again.
   */
  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const trimmedEmail =
      email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    /*
     * Small delay to make the login
     * interaction feel realistic.
     */
    window.setTimeout(() => {
      const success = login(
        trimmedEmail,
        password
      );

      if (success) {
        /*
         * Navigate to Dashboard after
         * successful authentication.
         */
        navigate("/", {
          replace: true,
        });
      } else {
        setError(
          "Invalid email or password. Please check your credentials."
        );
        setIsLoading(false);
      }
    }, 500);
  }

  function handleForgotPassword() {
    setError(
      "Password reset is not connected in this demo."
    );
  }

  function fillDemoCredentials() {
    setEmail("admin@onecloud.com");
    setPassword("admin123");
    setError("");
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-background-shape login-shape-one" />
        <div className="login-background-shape login-shape-two" />
        <div className="login-background-shape login-shape-three" />
      </div>

      <div className="login-container">

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="login-brand">
          <div className="login-brand-icon">
            O
          </div>

          <div className="login-brand-text">
            <h1>OneCloud</h1>
            <p>Super Admin Portal</p>
          </div>
        </div>

        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div className="login-card">

          <div className="login-card-header">
            <h2>Welcome Back</h2>

            <p>
              Sign in to access the Super Admin Portal
            </p>
          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div
              className="login-error"
              role="alert"
            >
              <span className="login-error-icon">
                !
              </span>

              <span>
                {error}
              </span>
            </div>
          )}

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}

            <div className="login-form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  @
                </span>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}

            <div className="login-form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  ●
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={isLoading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}

            <div className="login-options">

              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                  disabled={isLoading}
                />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="login-forgot"
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="login-submit-arrow">
                    →
                  </span>
                </>
              )}
            </button>

          </form>

          {/* =================================================
              DEMO CREDENTIALS
          ================================================= */}

          <div className="login-demo">

            <div className="login-demo-header">
              <span className="login-demo-icon">
                ℹ
              </span>

              <strong>
                Demo Credentials
              </strong>
            </div>

            <div className="login-demo-content">

              <div>
                <span>Email</span>

                <strong>
                  admin@onecloud.com
                </strong>
              </div>

              <div>
                <span>Password</span>

                <strong>
                  admin123
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="login-demo-button"
              onClick={fillDemoCredentials}
              disabled={isLoading}
            >
              Use Demo Credentials
            </button>

          </div>

        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="login-footer">
          <p>
            © 2026 One Enterprise Cloud Platform
          </p>

          <span>
            Secure Super Admin Access
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;
