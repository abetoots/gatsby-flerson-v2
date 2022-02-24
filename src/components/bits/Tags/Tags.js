import Button from "@Components/bits/Button/Button";
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: undefined,
    primaryTag: undefined,
    tag: undefined,
  },
});

const Tags = ({ hasPrimaryTag, handleClick, primaryTag, tags, ...props }) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {hasPrimaryTag ? (
        <Button
          onClick={(e) => handleClick(e, primaryTag, true)}
          classes={{ root: classes.primaryTag }}
        >
          {primaryTag}
        </Button>
      ) : null}

      {tags.map((tag) => (
        <Button
          key={tag}
          onClick={(e) => handleClick(e, tag, false)}
          classes={{ root: classes.tag }}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};

Tags.defaultProps = {
  hasPrimaryTag: false,
};

Tags.propTypes = {
  handleClick: PropTypes.func.isRequired,
  hasPrimaryTag: PropTypes.bool,
  primaryTag: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
