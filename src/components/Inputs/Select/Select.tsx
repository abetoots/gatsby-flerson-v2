import * as styles from "./Select.module.scss";
import InputLabel from "@Components/Inputs/Label/Label";
import Focus from "@Hoc/Focus/Focus";
import { BaseElementConfig, SelectOption } from "@Index/shared/utils/types";
import { exposeStyles } from "@Shared/api/styles";
import React, { useState } from "react";

const useStyles = exposeStyles({
  merge: {
    parent: "",
    root: styles.Select,
    option: "",
    _focused: "",
  },
});

export type SelectElementConfig = BaseElementConfig & {
  options: SelectOption[];
  valueAccessor?: string;
  labelAccessor?: string;
  disabled?: boolean;
  classes?: Partial<ReturnType<typeof useStyles>>;
};

type SelectProps = SelectElementConfig & {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ valueAccessor = "id", labelAccessor = "label", ...props }: SelectProps) => {
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");

  const [isFocused, setIsFocused] = useState(false);

  let rootClass = classes.root;
  if (isFocused) {
    rootClass = `${classes.root} ${classes._focused}`;
  }

  return (
    <div>
      <InputLabel
        label={props.heading}
        htmlFor={id}
        required={props.required}
        cornerHintText={props.cornerHintText}
        renderAfterLabel={props.renderAfterLabel}
        hidden={props.hiddenLabel}
      />
      <Focus run={(focused) => setIsFocused(focused)} keyBoardOnly={props.keyboardFocusOnly}>
        <select className={rootClass} value={props.value} onChange={props.onChange} required={props.required}>
          {props.options.map((option) => (
            <option key={option[valueAccessor]} value={option[valueAccessor]} className={classes.option}>
              {option[labelAccessor] || option}
            </option>
          ))}
        </select>
      </Focus>
    </div>
  );
};

export default Select;
