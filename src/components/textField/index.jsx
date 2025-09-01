import React from "react";
import styles from "./TextField.module.css";

const TextField = ({ type = "text", placeholder, onChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input_field}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextField;
