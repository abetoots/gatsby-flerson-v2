import React from "react"
import PropTypes from "prop-types"
import styles from "./Toolbar.module.scss"

const Toolbar = props => {
  return <div className={styles.Toolbar}>{props.children}</div>
}

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Toolbar
