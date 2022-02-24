import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import * as styles from "./Button.module.scss";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = exposeStyles({
  merge: {
    root: styles.Button,
  },
});

//Custom button that always behaves as type:'button' since buttons behave as type="submit" inside a form if type is missing
const Button = forwardRef((props, ref) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  return (
    <button
      ref={ref}
      type={props.type || "button"}
      className={classes.root}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props.label}
    >
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
Button.name = "Button";

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
