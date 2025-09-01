import React from "react";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <main className={styles.main}>
      <div className={styles.signupBox}>
        <h2 className={styles.heading}>Create Account ✨</h2>
        <p className={styles.subHeading}>Sign up to get started</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              required
              className={styles.input}
            />
          </div>
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

          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
