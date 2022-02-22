import React from "react";
import PropTypes from "prop-types";
import styles from "./Preview.module.scss";

//Misc
import { exposeStyles } from "@Shared/api/styles";
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

  let preview;
  if (props.state.preview || props.state.url || props.placeholder) {
    preview = (
      <img
        className={classes.image}
        src={props.state.preview || props.state.url || props.placeholder}
        alt="preview"
      />
    );
  } else {
    preview = <span>No file chosen</span>;
  }

  return <div className={classes.root}>{preview}</div>;
};

Preview.propTypes = {
  state: PropTypes.shape({
    url: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
};

export default Preview;
