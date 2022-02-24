import PropTypes from "prop-types";
import React from "react";

const Focus = ({ children, keyBoardOnly, focusClass, run }) => {
  const focusHandler = (e) => {
    //Handles keyboard focus only behavior
    if (keyBoardOnly) {
      if (e.type === "keyup") {
        //we listen to keyup because keydown is too late
        //if key code is tab
        if (e.keyCode === 9) {
          //should focus
          e.target.focus();
          if (focusClass) {
            e.target.classList.add(focusClass);
          }
          //run addional funcs
          if (run) {
            run(true);
          }
        }
      } else if (e.type === "blur") {
        //this will be the blur event
        e.target.blur();
        if (focusClass) {
          e.target.classList.remove(focusClass);
        }
        //run additional funcs
        if (run) {
          run(false);
        }
      }
    } else {
      //Handles normal focus behavior
      if (e.type === "focus") {
        e.target.focus();
        if (focusClass) {
          e.target.classList.add(focusClass);
        }
        if (run) {
          run(true);
        }
      } else if (e.type === "blur") {
        //this will be the blur event
        e.target.blur();
        if (focusClass) {
          e.target.classList.remove(focusClass);
        }
        //run additional funcs
        if (run) {
          run(false);
        }
      }
    }
  };

  return React.Children.map(children, (child, i) => {
    if (i === 0) {
      return React.cloneElement(child, {
        onFocus: focusHandler,
        onBlur: focusHandler,
        onKeyUp: focusHandler,
      });
    } else {
      return child;
    }
  });
};

Focus.propTypes = {
  focusClass: PropTypes.string,
  keyBoardOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  run: PropTypes.func,
};

export default Focus;
