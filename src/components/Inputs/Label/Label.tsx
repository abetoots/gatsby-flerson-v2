import { exposeStyles } from "@Shared/api/styles";
import classNames from "classnames";
import React from "react";
import * as styles from "./Label.module.scss";

const useStyles = exposeStyles({
  merge: {
    parent: styles.Label,
    root: styles.Label__labelEl,
  },
});

type InputLabelProps = {
  label: string;
  cornerHintText?: string;
  htmlFor?: string;
  required?: boolean;
  renderAfterLabel?: () => React.ReactNode;
  classes?: Partial<ReturnType<typeof useStyles>>;
  hidden?: boolean;
};

const InputLabel = ({ label, cornerHintText = "", htmlFor, required = false, renderAfterLabel, hidden = false, ...props }: InputLabelProps) => {
  const classes = useStyles(props);
  return label ? (
    <div className={classNames(classes.parent, { [styles._withCornerHint]: cornerHintText }, { "sr-only": hidden })}>
      <label htmlFor={htmlFor} className={classes.root}>
        {label}
        {required ? <span className={styles.Label__required}>*</span> : null}
      </label>
      {cornerHintText ? (
        <span className={styles.Label__cornerText} id="corner-hint">
          {cornerHintText}
        </span>
      ) : null}
      {renderAfterLabel ? renderAfterLabel() : null}
    </div>
  ) : null;
};

export default InputLabel;
