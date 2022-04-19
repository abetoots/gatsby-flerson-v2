//Component
import Button from "@Components/Button/Button";
//Misc
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./Controls.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  merge: {
    root: styles.Controls,
  },
});

const Controls = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  return (
    <Button classes={{ root: classes.root }} {...props}>
      {props.children}
    </Button>
  );
};

Controls.propTypes = {
  children: PropTypes.node,
  rootModifiers: PropTypes.object,
};

export default Controls;
