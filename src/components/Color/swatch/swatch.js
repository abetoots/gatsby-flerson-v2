import React from "react";
import PropTypes from "prop-types";
import styles from "./swatch.module.scss";

const Swatch = ({ color, handleClick }) => {
  return (
    <div
      className={styles.Swatch}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" ? handleClick() : null)}
      tabIndex={0}
      role="button"
      aria-label="color swatch button"
    >
      <div
        style={{ backgroundColor: color }}
        className={styles.Swatch__color}
      ></div>
    </div>
  );
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Swatch;
