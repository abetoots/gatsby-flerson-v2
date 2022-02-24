//Misc
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import * as styles from "./checkbox.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  merge: {
    root: styles.Checkbox,
    li: styles.Checkbox__li,
  },
  replace: {
    input: styles.Checkbox__input,
    _focused: styles._focused,
    description: styles.Checkbox__description,
  },
});

const Checkbox = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const [isFocused, setIsFocused] = useState(-1);

  /**
   * Checkbox input change handler
   * Handles checkbox cases where we expect the checkbox's state to be an array of currently checked values
   */
  const checkboxHandler = (event, valueType, removes = null) => {
    //make a copy of the old state
    let copy = [...props.state];
    const value =
      valueType === "number" ? +event.target.value : event.target.value;
    //if checkbox is about to be checked
    if (event.target.checked) {
      //this handles if the current check should uncheck other values in the current state
      if (removes) {
        copy = copy.filter((val) => val !== removes);
      }
      //push the value to the copied array
      copy.push(value);
    } else {
      //if checkbox is about to be unchecked
      // we also want to remove that value from the copied array
      copy = copy.filter((val) => val !== value);
    }

    //handler will now set the new array as the new value of this inputKey's state
    props.stateHandler(copy);
  };

  //Focus handler that determines which <li></li> should be focused 'normally' or on keyboard users only
  //@Watch: We handle it manually until :focus-visible is supported fully
  const focusHandler = (e, index) => {
    //Handles keyboard focus only behavior
    if (props.keyBoardFocusOnly) {
      if (e.type === "keyup") {
        //we listen to keyup because keydown is too late
        //if key code is tab
        if (e.keyCode === 9) {
          //we set the index of the current li as focused
          setIsFocused(index);
        }
      } else if (e.type === "blur") {
        //this will be the blur event
        setIsFocused(-1);
      }
    } else {
      //Handles normal focus behavior
      if (e.type === "focus") {
        setIsFocused(index);
      } else if (e.type === "blur") {
        //this will be the blur event
        setIsFocused(-1);
      }
    }
  };

  let description;
  if (props.description) {
    description = (
      <span className={classes.description} style={{ fontStyle: "italic" }}>
        {props.description}
      </span>
    );
  }

  return (
    <ul className={classes.root} aria-labelledby={props.ariaLabelledBy}>
      {props.elementConfig.options.map((option, index) => {
        //problem: if option value is of type number, checked will never work as the input value (event.target.value)
        //pushed to our state will always be a string.
        //fix: we need to let our handler know what type of value to push to our state
        const valType = typeof option.value || typeof option;
        return (
          <li
            key={option.value || option}
            className={
              isFocused === index
                ? `${classes.li} ${classes._focused}`
                : classes.li
            }
          >
            <input
              id={option.value || option}
              className={classes.input}
              type="checkbox"
              value={option.value || option}
              name={props.name}
              checked={props.state.includes(
                option.value || option || props.initialValue[0]
              )}
              onChange={(e) => checkboxHandler(e, valType, option.removes)}
              onKeyUp={(e) => focusHandler(e, index)}
              onBlurCapture={(e) => focusHandler(e, index)}
              onFocusCapture={(e) => focusHandler(e, index)}
            />
            <label htmlFor={option.value || option}>
              {option.label || option}
            </label>
            {description}
          </li>
        );
      })}
    </ul>
  );
};

Checkbox.defaultProps = {
  keyBoardFocusOnly: false,
};

Checkbox.propTypes = {
  ariaLabelledBy: PropTypes.string,
  elementConfig: PropTypes.shape({
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    ]).isRequired,
  }),
  initialValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyBoardFocusOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  state: PropTypes.array.isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Checkbox;
