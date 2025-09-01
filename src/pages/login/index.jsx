import React from "react";
import styles from "./login.module.css"
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.heading}>Welcome Back 👋</h2>
          <p className={styles.subHeading}>Login to your account</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
