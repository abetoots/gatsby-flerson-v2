import { exposeStyles } from "@Shared/api/styles";
//Misc
import { isFile } from "@Shared/utils/helper-funcs";
import PropTypes from "prop-types";
import React from "react";

//Components
import Controls from "./Controls";
import * as styles from "./Controls.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior:  props.classes will MERGE what you exposed when using exposeStyles
const useStyles = exposeStyles({
  replace: {
    root: styles._choose,
  },
});

/**
 * Component API
 * Overrides:
 *  - btnText: defaults to "Choose Upload"
 *  - hasFileBtnText: when user currently has a file selection, this text takes over btnText. defaults to "Change Upload"
 *
 * @param {*} props
 */
const Choose = ({ btnText = "choose file", ...props }) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  //Children
  //Default: Single child <span/> with text changing depending on btnText and hasFileBtnTxt.
  let children = (
    <span>{isFile(props.state.file) ? props.hasFileBtnText : btnText}</span>
  );
  /**
   * Override
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText and hasFileBtnTxt. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = isFile(props.state.file) ? props.hasFileBtnText : btnText;
    children = props.children;
  }

  /**
   * Upload button handler
   * Problem: We can't style <input type="file"/> buttons through css
   * Solution: We delegate it to a different button we can style which simply triggers a click on <input type="file"/>
   */
  const chooseFileHandler = (e, uploadInputRef) => {
    uploadInputRef.current.click();
  };

  return (
    <Controls
      classes={{ root: classes.root }}
      onClick={(e) => chooseFileHandler(e, props.uploadInputRef)}
      label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Choose.defaultProps = {
  btnText: "Choose File",
  hasFileBtnText: "Change File",
};

Choose.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  uploadInputRef: PropTypes.object,
  hasFileBtnText: PropTypes.string,
  state: PropTypes.exact({
    file: PropTypes.object,
    preview: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Choose;
