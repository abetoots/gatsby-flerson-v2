import InputLabel from "@Components/Inputs/Label/Label";
import Focus from "@Hoc/Focus/Focus";
import { BaseElementConfig } from "@Index/shared/utils/types";
import { exposeStyles } from "@Shared/api/styles";
import React, { useState } from "react";
//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    parent: "",
    root: "",
    _focused: "_focused",
  },
});

//used by InputGroup
export type InputElementConfig = BaseElementConfig & {
  id?: string;
  trailingElement?: React.ReactNode | (() => JSX.Element | JSX.Element[]);
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  classes?: Partial<ReturnType<typeof useStyles>>;
  renderBeforeInput?: (isFocused?: boolean) => React.ReactNode;
  renderAfterInput?: (isFocused?: boolean) => React.ReactNode;
  invalid?: boolean;
  required?: boolean;
};

//not exposed to InputGroup, props specific for this component only
export type DefaultInputProps = InputElementConfig & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: any;
};

const Input = React.forwardRef<HTMLInputElement, DefaultInputProps>(({ invalid = false, ...props }, ref) => {
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");
  const { _focused } = classes;

  const [focus, setFocus] = useState(false);

  let trailingElement;
  if (props.trailingElement) {
    trailingElement = typeof props.trailingElement === "function" ? props.trailingElement() : props.trailingElement;
  }

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
      {props.renderBeforeInput ? props.renderBeforeInput(focus) : null}
      <div>
        <Focus applyClassName={_focused} run={(isFocused) => setFocus(isFocused)} keyBoardOnly={props.keyboardFocusOnly}>
          <input
            id={id}
            type={props.type}
            className={classes.root}
            value={props.value}
            onChange={props.onChange}
            aria-describedby="description"
            aria-invalid={invalid}
            placeholder={props.placeholder}
            onKeyDown={props.onKeyDown}
            disabled={props.disabled}
            required={props.required}
            ref={ref}
          />
          {trailingElement}
        </Focus>
      </div>
      {props.renderAfterInput ? props.renderAfterInput(focus) : null}
    </div>
  );
});

export default Input;
