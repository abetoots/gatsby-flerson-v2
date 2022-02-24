import Focus from "@Components/hoc/Focus/Focus";
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: "",
    line: "",
    _focused: "_focused",
  },
});

const Input = (props) => {
  const classes = useStyles(props);

  const { _focused } = classes;

  const [focus, setFocus] = useState(false);

  let lineClass = classes.line;
  if (focus) {
    lineClass = `${lineClass} ${_focused}`;
  }

  return (
    <>
      <Focus applyClassName={_focused} run={(isFocused) => setFocus(isFocused)}>
        <input
          className={classes.root}
          {...props.elementConfig}
          value={props.state}
          onChange={(event) => props.stateHandler(event.target.value)}
          aria-labelledby={props.ariaLabelledBy}
        />
      </Focus>
      <div className={lineClass}></div>
    </>
  );
};

Input.defaultProps = {
  keyBoardFocusOnly: false,
};

Input.propTypes = {
  ariaLabelledBy: PropTypes.string,
  elementConfig: PropTypes.object,
  initialValue: PropTypes.string,
  keyBoardFocusOnly: PropTypes.bool,
  state: PropTypes.string.isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Input;
