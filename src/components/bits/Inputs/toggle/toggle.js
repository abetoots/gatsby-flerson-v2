import React, { useState } from "react"
import PropTypes from "prop-types"
import styles from "./toggle.module.scss"

const Toggle = props => {
  const { Toggle, Toggle__input, _focused = "_focused" } = styles
  const [isFocused, setIsFocused] = useState(false)

  let rootClass = Toggle
  if (isFocused) {
    rootClass = `${rootClass} ${_focused}`
  }

  /**
   * Toggle input change handler
   * @param {String} inputKey
   * @param {Event} event The Event object
   * @param {Function} handler Handler function returned by a custom hook from props.registerState
   */
  const toggleHandler = event => {
    //if toggle is about to be checked
    if (event.target.checked) {
      props.stateHandler(true)
    } else {
      props.stateHandler(false)
    }
  }

  //Focus handler that determines if this element should be focused 'normally' or on keyboard users only
  //@Watch: We handle it manually until :focus-visible is supported fully
  const focusHandler = e => {
    //Handles keyboard focus only behavior
    if (props.keyBoardFocusOnly) {
      if (e.type === "keyup") {
        //we listen to keyup because keydown is too late
        //if key code is tab
        if (e.keyCode === 9) {
          //should focus
          setIsFocused(true)
        }
      } else if (e.type === "blur") {
        //this will be the blur event
        setIsFocused(false)
      }
    } else {
      //Handles normal focus behavior
      if (e.type === "focus") {
        setIsFocused(true)
      } else if (e.type === "blur") {
        //this will be the blur event
        setIsFocused(false)
      }
    }
  }

  return (
    <div className={rootClass}>
      <input
        className={Toggle__input}
        type="checkbox"
        checked={props.state || props.initialValue}
        onChange={toggleHandler}
        onKeyUp={focusHandler}
        onFocus={focusHandler}
        onBlur={focusHandler}
        aria-labelledby={props.ariaLabelledBy}
      />
    </div>
  )
}

Toggle.defaultProps = {
  keyBoardFocusOnly: false,
}

Toggle.propTypes = {
  ariaLabelledBy: PropTypes.string,
  initialValue: PropTypes.bool.isRequired,
  keyBoardFocusOnly: PropTypes.bool,
  state: PropTypes.bool.isRequired,
  stateHandler: PropTypes.func.isRequired,
}

export default Toggle
