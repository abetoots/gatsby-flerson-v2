//Components
import Button from "@Components/bits/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
//Misc
import { Editor } from "slate";
import { useSlate } from "slate-react";

import * as styles from "./MarkButton.module.scss";

const MarkButton = ({ format, icon }) => {
  //get the editor in context
  const editor = useSlate();

  let rootClass = styles.MarkButton;
  //If the current format is active in the current editor, add the active class
  if (isMarkActive(editor, format)) {
    rootClass = `${rootClass} ${styles._active}`;
  }

  return (
    <Button
      classes={{ root: rootClass }}
      onClick={() => toggleMark(editor, format)}
      label={format}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

MarkButton.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default MarkButton;
