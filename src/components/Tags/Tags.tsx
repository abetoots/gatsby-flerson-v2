import Button from "@Components/Button/Button";
import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: "",
    primaryTag: "",
    tag: "",
  },
});

export type TagsProps = {
  classes?: ReturnType<typeof useStyles>;
  primaryTag?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string, isPrimaryTag: boolean) => void;
  tags: string[];
};

const Tags = ({ onClick, primaryTag = "", tags, ...props }: TagsProps) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {primaryTag ? (
        <Button onClick={(e) => onClick(e, primaryTag, true)} classes={{ root: classes.primaryTag }}>
          {primaryTag}
        </Button>
      ) : null}

      {tags.length > 0 &&
        tags.map((tag) => (
          <Button key={tag} onClick={(e) => onClick(e, tag, false)} classes={{ root: classes.tag }}>
            {tag}
          </Button>
        ))}
    </div>
  );
};

export default Tags;
