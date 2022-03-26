//Components
import Button from "@Components/Button/Button";
//Misc
import { exposeStyles } from "@Shared/api/styles";
import React from "react";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: "",
  },
});

type JobApplyButtonProps = {
  classes?: ReturnType<typeof useStyles>;
  applyUrl: string;
};

const JobApplyButton = (props: JobApplyButtonProps) => {
  const classes = useStyles(props);
  let applyButton;
  if (!props.applyUrl) {
    applyButton = (
      <Button onClick={(e) => e.stopPropagation()} classes={{ root: classes.root }}>
        Apply
      </Button>
    );
  } else {
    applyButton = (
      <a onClick={(e) => e.stopPropagation()} href={props.applyUrl} rel="noopener noreferrer nofollow" target="_blank" className={classes.root}>
        Apply
      </a>
    );
  }
  return applyButton;
};

export default JobApplyButton;
