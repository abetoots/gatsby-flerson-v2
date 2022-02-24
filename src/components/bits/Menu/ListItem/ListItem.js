import { exposeStyles } from "@Shared/api/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = exposeStyles({
  replace: {
    root: "",
  },
});

const ListItem = (props) => {
  const classes = useStyles(props);

  const rootClasses = [classes.root];

  if (props.parentVariant === "horizontal") {
    rootClasses.push(classes._row);
  }

  return React.Children.only(props.children) ? (
    <li className={classes.root}>{props.children}</li>
  ) : null;
};

ListItem.propTypes = {
  parentVariant: PropTypes.oneOf(["horizontal", "default"]),
  children: PropTypes.node,
};

export default ListItem;
