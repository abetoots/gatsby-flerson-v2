import React from "react";
import InputLabel from "@Components/Inputs/Label/Label";
import { BaseElementConfig } from "@Index/shared/utils/types";
import { exposeStyles } from "@Index/shared/api/styles";
import * as styles from "./Textarea.module.scss";
import Focus from "@Hoc/Focus/Focus";

const useStyles = exposeStyles({
  merge: {
    parent: "",
    root: styles.Textarea,
    _focused: "",
  },
});

export type TextAreaElementConfig = BaseElementConfig & {
  rows?: number;
  placeholder?: string;
};

type TextAreaProps = TextAreaElementConfig & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ placeholder = "Enter some long form content.", rows = 3, ...props }: TextAreaProps) => {
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");
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
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          className={classes.root}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
        />
      </Focus>
    </div>
  );
};

export default TextArea;
