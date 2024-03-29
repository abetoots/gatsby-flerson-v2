import { exposeStyles } from "@Shared/api/styles";
import React from "react";

import * as styles from "./Logo.module.scss";
import logo from "@Images/flerson-logo.svg";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    image: styles.Logo__img,
  },
});

type LogoProps = {
  classes?: ReturnType<typeof useStyles>;
};

const Logo = (props: LogoProps) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  return (
    <div className={styles.Logo}>
      <img className={classes.image} src={logo} alt="Flerson Logo" placeholder="blurred" />
    </div>
  );
};

export default Logo;
