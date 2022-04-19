import { exposeStyles } from "@Shared/api/styles";
import React from "react";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE with what you exposed when using MUI
const useStyles = exposeStyles({
  replace: {
    root: "",
  },
});

type StatusProps = React.PropsWithChildren<{
  error?: boolean;
  success?: boolean;
  classes?: Partial<ReturnType<typeof useStyles>>;
}>;

const Status = (props: StatusProps) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const ariaLabel = ["form status"];

  if (props.success) {
    ariaLabel.push("success");
  }

  if (props.error) {
    ariaLabel.push("error");
  }

  return (
    <div className={classes.root} aria-label={ariaLabel.join(" ")}>
      {props.children}
    </div>
  );
};

export default Status;
