import React from "react";
import "./Login.css"; 

function Loginpage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-bg">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center login-title mb-4">Welcome Back</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="••••••••" />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="small login-link">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-danger w-100">Login</button>
        </form>
        <p className="text-center text-muted mt-3">
          Don't have an account? <a href="#" className="login-link">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Loginpage;
