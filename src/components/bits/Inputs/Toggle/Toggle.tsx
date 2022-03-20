import React from "react";

import { exposeStyles } from "@Index/shared/api/styles";
import * as styles from "./Toggle.module.scss";
import Focus from "@Hoc/Focus/Focus";
import InputLabel from "@Components/bits/Inputs/Label/Label";
import { BaseElementConfig } from "@Index/shared/utils/types";

const useStyles = exposeStyles({
  merge: {
    parent: "",
    root: styles.Toggle,
    toggle: styles.Toggle__input,
    _focused: "",
  },
});

type ToggleProps = BaseElementConfig & {
  value: boolean;
  stateHandler: (value: boolean) => void;
};

const Toggle = (props: ToggleProps) => {
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");

  /**
   * Toggle input change handler
   * @param {String} inputKey
   * @param {Event} event The Event object
   * @param {Function} handler Handler function returned by a custom hook from props.registerState
   */
  const toggleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //if toggle is about to be checked
    if (event.target.checked) {
      props.stateHandler(true);
    } else {
      props.stateHandler(false);
    }
  };

  return (
    <div className={classes.parent}>
      <InputLabel
        label={props.heading}
        htmlFor={id}
        required={props.required}
        cornerHintText={props.cornerHintText}
        renderAfterLabel={props.renderAfterLabel}
        hidden={props.hiddenLabel}
      />
      <Focus applyClassName={classes._focused} keyBoardOnly={props.keyboardFocusOnly}>
        <div className={classes.root}>
          <input className={classes.toggle} type="checkbox" checked={props.value} onChange={toggleHandler} />
        </div>
      </Focus>
    </div>
  );
};

export default Toggle;
