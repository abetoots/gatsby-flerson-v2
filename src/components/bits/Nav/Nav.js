import React, { useRef } from "react";
import PropTypes from "prop-types";

import { exposeStyles } from "@Shared/api/styles";

const useStyles = exposeStyles({
  merge: {
    root: "Nav",
    _focused: "_focused",
    _hidden: "_hidden",
  },
});

const Nav = (props) => {
  const classes = useStyles(props);
  const rootClasses = [classes.root];
  if (!props.visible) {
    rootClasses.push(classes._hidden);
  }

  const rootRef = useRef(null);

  //Whenever any descendant is focused, this captures it. We simply add a focus class
  const focusCaptureHandler = (e) => {
    if (e.type === "focus" && rootRef.current) {
      rootRef.current.classList.add(classes._focused);
    } else {
      rootRef.current.classList.remove(classes._focused);
    }
  };

  return (
    <nav
      ref={rootRef}
      className={rootClasses.join(" ")}
      onFocusCapture={focusCaptureHandler}
      onBlurCapture={focusCaptureHandler}
    >
      {props.children}
    </nav>
  );
};

Nav.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

export default Nav;
