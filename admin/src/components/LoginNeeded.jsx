import React from "react";
import "./LoginNeeded.css";
import { Lock } from "lucide-react";

const LoginNeeded = ({showLogin, setShowLogin}) => {
  return (
    <div className="login-needed-container">
      <div className="login-needed-card">
        <div className="icon-wrapper">
          <Lock size={60} />
        </div>

        <h2>Admin Access Required</h2>
        <p>
          You must be logged in as an <strong>Admin</strong> to view this page.
        </p>

        <button
          onClick={() => setShowLogin(true)}
          className="login-needed-btn"
        >
          Go to Admin Login
        </button>

        <span className="note">
          This area is restricted. Only users with admin rights can continue.
        </span>
      </div>
    </div>
  );
};

export default LoginNeeded;
