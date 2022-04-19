import PropTypes from "prop-types";
import React from "react";

import * as styles from "./Toolbar.module.scss";

const Toolbar = (props) => {
  return <div className={styles.Toolbar}>{props.children}</div>;
};

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Toolbar;
