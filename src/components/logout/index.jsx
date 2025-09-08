import React from "react";
import styles from "./logout.module.css";

const LogoutButton = ({ onClick }) => {
  return (
    <button className={styles.logoutBtn} onClick={onClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
