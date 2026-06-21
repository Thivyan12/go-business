import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const token = Cookies.get("jwt_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and Password is required");
      return;
    }

    try {
      const response = await fetch(
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const token = data?.data?.token;

        Cookies.set("jwt_token", token, {
          expires: 7,
        });

        console.log("JWT Token:", token);

        window.location.replace("/");
      } else {
        setError(data?.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-page">
      <div className="login-card">
        <h1 className="logo">Go Business</h1>

        <p className="tagline">
          Sign in to open your referral dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="signin-btn"
          >
            Sign in
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;