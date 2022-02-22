import React from "react";
import PropTypes from "prop-types";

import { exposeStyles } from "@Shared/api/styles";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE with what you exposed when using MUI
const useStyles = exposeStyles({
  replace: {
    root: undefined,
  },
});

const Status = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const ariaLabel = ["form status"];

  if (props.success) {
    ariaLabel.push("success");
  }

  if (props.error) {
    ariaLabel.push("error");
  }

  return (
    <div className={classes.root} aria-label={ariaLabel.join(" ")}>
      {props.children}
    </div>
  );
};

Status.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default Status;
