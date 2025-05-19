import React from "react";
import "./Signup.css";

function SignupPage() {
  return (
    <div className="signup-page-bg">
      <div className="signup-card">
        <h2 className="signup-title text-center">Create Your Account</h2>
        <p className="signup-subtitle text-center">Sign up to get started with Postax</p>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input type="text" className="form-control" id="name" placeholder="Your Name" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input type="password" className="form-control" id="password" placeholder="Create password" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-shield-lock"></i></span>
              <input type="password" className="form-control" id="confirm" placeholder="Confirm password" />
            </div>
          </div>

          <button type="submit" className="btn btn-signup w-100">Sign Up</button>
        </form>
        <p className="text-center signup-footer">
          Already have an account? <a href="/login" className="signup-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
