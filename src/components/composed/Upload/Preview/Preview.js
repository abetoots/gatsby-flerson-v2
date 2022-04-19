//Misc
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./Preview.module.scss";
//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = exposeStyles({
  replace: {
    root: styles.Preview,
    image: styles.Preview__image,
  },
});

const Preview = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <img className={classes.image} src={props.url} alt="preview" />
    </div>
  );
};

Preview.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Preview;
