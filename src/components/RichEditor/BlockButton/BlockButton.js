//Components
import Button from "@Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
//Misc
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

import * as styles from "./BlockButton.module.scss";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const BlockButton = ({ format, icon, children }) => {
  //get the editor in context
  const editor = useSlate();

  return (
    <Button
      classes={{ root: styles.BlockButton }}
      onClick={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
      label={format}
    >
      {children || <FontAwesomeIcon icon={icon} />}
    </Button>
  );
};

//Triggers specific Transforms.
//Since we don't provide a location to the transforms, these are based on the current selection.
export const toggleBlock = (editor, format) => {
  //Check if the current node selection already has this format applied
  const isActive = isBlockActive(editor, format);
  //Check if this format is a list type, meaning we need to transform our nodes to list items first
  const isList = LIST_TYPES.includes(format);

  //If the current node selection contains nodes with the type having a match against LIST_TYPES, this means
  //the current node went through #2 below (it is wrapped). We want to handle unwrapping the current node
  //and let the Transform.setNodes below handle reversing it to a paragraph
  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  //Set the correct 'type' for the current node selection
  //1. If this format is already applied, we always revert to paragraph
  //2. No active format, if the format we are trying to apply is a list type, our nodes should be set to <li></li> ...
  //3. Else, no active format, we apply the format to the current node selection
  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  //>related 2. ... then we wrap those <li></li> with either a 'ol' or 'ul'
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

//returns true if any nodes in the current editor match the format
// https://github.com/ianstormtaylor/slate/issues/3481
const isBlockActive = (editor, format) => {
  let match = false;
  for (const [node] of Editor.nodes(editor, {
    match: (n) => n.type === format,
  })) {
    if (node.type === format) match = true;
    break;
  }
  return !!match;
};

BlockButton.propTypes = {
  format: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default BlockButton;
