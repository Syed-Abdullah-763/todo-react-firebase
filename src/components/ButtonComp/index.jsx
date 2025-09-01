import React from "react";
import styles from "./ButtonComp.module.css";
const ButtonComp = ({ label = "Button", style, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <button
      className={styles.btn}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
    </button>
  );
};

export default ButtonComp;
