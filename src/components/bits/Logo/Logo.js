import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./Logo.module.scss";

console.log("styles", styles);

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    image: styles.Logo__img,
  },
});

const Logo = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  return (
    <div className={styles.Logo}>
      <img
        className={classes.image}
        src={props.src}
        alt={props.alt ? `${props.alt}` : "Site Logo"}
      />
    </div>
  );
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Logo;
