import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Drag and Drop Website Layout Builder</h1>
      <p>
        Build your layout by dragging and dropping elements into the drop area.
      </p>
    </div>
  );
};

export default Header;
