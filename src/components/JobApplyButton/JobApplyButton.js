import React from "react";
import PropTypes from "prop-types";

//Components
import Button from "@Components/bits/Button/Button";

//Misc
import { exposeStyles } from "@Shared/api/styles";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: undefined,
  },
});

const JobApplyButton = (props) => {
  const classes = useStyles(props);
  let applyButton;
  if (!props.applyUrl) {
    applyButton = (
      <Button
        onClick={(e) => e.stopPropagation()}
        classes={{ root: classes.root }}
      >
        Apply
      </Button>
    );
  } else {
    applyButton = (
      <a
        onClick={(e) => e.stopPropagation()}
        href={props.applyUrl}
        rel="noopener noreferrer nofollow"
        target="_blank"
        className={classes.root}
      >
        Apply
      </a>
    );
  }
  return applyButton;
};

JobApplyButton.propTypes = {
  applyUrl: PropTypes.string.isRequired,
};

export default JobApplyButton;
