import PropTypes from "prop-types";
import React, { useState } from "react";

import * as styles from "./ToggleJobs.module.scss";

//responsible for toggling between all, company type, or individual type job posts in the current context
const ToggleJobs = ({ currentContextPosts, setCurrentPosts }) => {
  const [toggle, setToggle] = useState("all");

  const toggleHandler = (type) => {
    switch (type) {
      case "all":
        setToggle("all");
        if (currentContextPosts) {
          setCurrentPosts(currentContextPosts);
        }
        break;
      case "companies":
        setToggle("companies");
        if (currentContextPosts) {
          const a = currentContextPosts.filter(
            (post) => post.hiringInfo.type === "company"
          );
          setCurrentPosts(a);
        }
        break;
      case "single":
        setToggle("single");
        if (currentContextPosts) {
          const b = currentContextPosts.filter(
            (post) => post.hiringInfo.type === "individual"
          );
          setCurrentPosts(b);
        }
        break;
      default:
        return;
    }
  };

  return (
    <div className={styles.ToggleJobs}>
      <button
        className={`${styles.ToggleJobs__button} ${styles._all} ${
          toggle === "all" ? styles._active : ""
        }`}
        onClick={() => toggleHandler("all")}
      >
        All
      </button>
      <button
        className={`${styles.ToggleJobs__button} ${styles._companies} ${
          toggle === "companies" ? styles._active : ""
        }`}
        onClick={() => toggleHandler("companies")}
      >
        Companies
      </button>
      <button
        className={`${styles.ToggleJobs__button} ${styles._single} ${
          toggle === "single" ? styles._active : ""
        }`}
        onClick={() => toggleHandler("single")}
      >
        Single Client
      </button>
    </div>
  );
};

ToggleJobs.propTypes = {
  currentContextPosts: PropTypes.array,
  setCurrentPosts: PropTypes.func.isRequired,
};

export default ToggleJobs;
