import React from "react"
import PropTypes from "prop-types"

const withFocus = (PassedComponent, keyBoardOnly) => {
  return ({ children, ...props }) => {
    const focusHandler = e => {
      //Handles keyboard focus only behavior
      if (keyBoardOnly) {
        if (e.type === "keyup") {
          //we listen to keyup because keydown is too late
          //if key code is tab
          if (e.keyCode === 9) {
            //should focus
            e.target.focus()
          }
        } else if (e.type === "blur") {
          //this will be the blur event
          e.target.blur()
        }
      } else {
        //Handles normal focus behavior
        if (e.type === "focus") {
          e.target.focus()
        } else if (e.type === "blur") {
          //this will be the blur event
          e.target.blur()
        }
      }
    }
    return (
      <PassedComponent
        onKeyUp={focusHandler}
        onFocus={focusHandler}
        onBlur={focusHandler}
        {...props}
      >
        {children}
      </PassedComponent>
    )
  }
}

withFocus.propTypes = {
  keyBoardOnly: PropTypes.bool,
}

export default withFocus
