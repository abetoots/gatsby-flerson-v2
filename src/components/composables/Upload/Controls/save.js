//Misc
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

import Controls from "./Controls";
import * as styles from "./Controls.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE what you exposed when using exposeStyles
const useStyles = exposeStyles({
  replace: {
    root: styles._save,
  },
});

const Save = ({ btnText = "remove", ...props }) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  //Children
  //Default: Single child <span/> with text depending on btnText.
  let children = <span>{props.btnText}</span>;
  //Override
  /**
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = btnText;
    children = props.children;
  }

  return (
    <Controls
      classes={{ root: classes.root }}
      onClick={props.handleSave}
      label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Save.defaultProps = {
  btnText: "Save",
};

Save.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  handleSave: PropTypes.func.isRequired,
};

export default Save;
