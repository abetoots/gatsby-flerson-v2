import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Menu.module.scss";

//Components
import ListItem from "./ListItem/ListItem";

//Misc
import { exposeStyles } from "@Shared/api/styles";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  merge: {
    root: styles.Menu,
    ul: styles.Menu__ul,
    label: "",
    liRoot: "", //this is only exposed if not using a custom li component
  },
  replace: {
    //overrides the styling mechanisms for these classes
    _hidden: styles._hidden,
    _desktopOnly: styles._desktopOnly,
    _horizontal: styles._horizontal,
  },
});

//TODO maybe handle sub menus more elegantly
const Menu = forwardRef((props, ref) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const rootClasses = [classes.root];
  const ulClasses = [classes.ul];

  if (props.desktopOnly) {
    rootClasses.push(classes._desktopOnly);
  }

  if (!props.visible) {
    //TODO this logic was made for handling "navigation" menus, remove now that we defined Menu !== Nav
    rootClasses.push(classes._hidden);
  }

  if (props.variant === "horizontal") {
    ulClasses.push(styles._horizontal);
  }

  let label;
  if (props.label) {
    label = <h4 className={classes.label}>{props.label}</h4>;
  }

  let renderItems;
  //TODO use render props technique
  if (props.liComponent) {
    renderItems = props.list.map((item) => {
      //TODO maybe handle this more elegantly
      try {
        //If dealing with jsx literals
        return React.cloneElement(props.liComponent, {
          key: item.key,
          dataCurrentItem: item,
        });
      } catch {
        try {
          //When dealing with React.elementType
          return <props.liComponent key={item.key} dataCurrentItem={item} />;
        } catch (err) {
          console.error(err);
        }
      }
    });
  } else {
    renderItems = props.list.map((item) => {
      return (
        <ListItem
          classes={{ root: classes.liRoot }}
          key={item.key}
          parentVariant={props.variant}
        >
          <span>{item.label}</span>
        </ListItem>
      );
    });
  }

  return (
    <div className={rootClasses.join(" ")} ref={ref}>
      {label}
      <ul className={ulClasses.join(" ")} aria-expanded={props.visible}>
        {renderItems}
      </ul>
    </div>
  );
});

Menu.displayName = "Menu";

Menu.defaultProps = {
  visible: true,
  variant: "default",
};

Menu.propTypes = {
  variant: PropTypes.oneOf(["horizontal", "default"]),
  desktopOnly: PropTypes.bool,
  label: PropTypes.string,
  liComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType]),
  list: PropTypes.array.isRequired,
  visible: PropTypes.bool,
};

export default Menu;
