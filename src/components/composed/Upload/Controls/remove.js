//Misc
import { exposeStyles } from "@Shared/api/styles";
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
    root: styles._remove,
  },
});

const Remove = ({ btnText = "remove", ...props }) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  //Children
  //Default: Single child <span/> with text depending on btnText.
  let children = <span>{btnText}</span>;
  /**
   * Override
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = btnText;
    children = props.children;
  }

  const removeBtnHandler = (e) => {
    //TODO link as to why
    //We always want to revoke previous object url
    //Avoid memory issues by revoking the previous objecUrl created
    URL.revokeObjectURL(props.state.preview);
    props.stateHandler({
      ...props.state,
      file: "",
      preview: "",
    });
  };

  return (
    <Controls
      classes={{ root: classes.root }}
      onClick={removeBtnHandler}
      label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Remove.defaultProps = {
  btnText: "Remove",
};

Remove.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  state: PropTypes.exact({
    file: PropTypes.object,
    preview: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Remove;
