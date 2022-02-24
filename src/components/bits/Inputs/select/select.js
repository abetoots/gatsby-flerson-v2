import PropTypes from "prop-types";
import React, { useState } from "react";

import * as styles from "./select.module.scss";

const Select = (props) => {
  const { Select, _focused = "_focused" } = styles;

  const [isFocused, setIsFocused] = useState(false);

  let rootClass = Select;
  if (isFocused) {
    rootClass = `${rootClass} ${_focused}`;
  }

  //Focus handler that determines if this element should be focused 'normally' or on keyboard users only
  //@Watch: We handle it manually until :focus-visible is supported fully
  const focusHandler = (e) => {
    //Handles keyboard focus only behavior
    if (props.keyBoardFocusOnly) {
      if (e.type === "keyup") {
        //we listen to keyup because keydown is too late
        //if key code is tab
        if (e.keyCode === 9) {
          //should focus
          setIsFocused(true);
        }
      } else if (e.type === "blur") {
        //this will be the blur event
        setIsFocused(false);
      }
    } else {
      //Handles normal focus behavior
      if (e.type === "focus") {
        setIsFocused(true);
      } else if (e.type === "blur") {
        //this will be the blur event
        setIsFocused(false);
      }
    }
  };

  return (
    <select
      className={rootClass}
      value={props.state || props.initialValue}
      onChange={(event) => props.stateHandler(event.target.value)}
      onKeyUp={focusHandler}
      onFocus={focusHandler}
      onBlur={focusHandler}
      aria-labelledby={props.ariaLabelledBy}
    >
      {props.elementConfig.options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  keyBoardFocusOnly: false,
};

Select.propTypes = {
  ariaLabelledBy: PropTypes.string,
  elementConfig: PropTypes.shape({
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    ]).isRequired,
  }),
  initialValue: PropTypes.string.isRequired,
  keyBoardFocusOnly: PropTypes.bool,
  state: PropTypes.string.isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Select;
