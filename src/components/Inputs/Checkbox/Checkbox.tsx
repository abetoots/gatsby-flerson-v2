import InputLabel from "@Components/Inputs/Label/Label";
import Focus from "@Hoc/Focus/Focus";
import { BaseElementConfig, CheckboxOption } from "@Index/shared/utils/types";
import { exposeStyles } from "@Shared/api/styles";
import React, { useState } from "react";

import * as styles from "./Checkbox.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  merge: {
    parent: "",
    root: styles.Checkbox,
    inputWrap: styles.Checkbox__inputWrap,
    optionLabel: styles.Checkbox__label,
  },
  replace: {
    input: styles.Checkbox__input,
    _focused: styles._focused,
    description: styles.Checkbox__description,
  },
});

export type CheckBoxElementConfig = BaseElementConfig & {
  options: CheckboxOption[];
  legend?: string;
  valueAccessor?: string;
  labelAccessor?: string;
  errorText?: string;
  valsWithLabel?: boolean;
  classes?: Partial<ReturnType<typeof useStyles>>;
  required?: boolean;
  renderBeforeInput?: (option: CheckboxOption) => React.ReactNode;
};

type CheckboxProps = CheckBoxElementConfig & {
  value: any[];
  stateHandler: (values: any[]) => void;
  renderAfterOptionLabel?: (currValue: string, currLabel: string) => React.ReactNode;
};

const Checkbox = ({ options = [], labelAccessor = "label", valueAccessor = "value", errorText = "", valsWithLabel = false, ...props }: CheckboxProps) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");
  const [isFocused, setIsFocused] = useState(NaN);

  /**
   * Checkbox input change handler
   * Handles checkbox cases where we expect the checkbox's state to be an array of currently checked values
   */
  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>, value: any, label: any, removes?: any) => {
    //make a copy of the old state
    let copy = [...props.value];
    //if checkbox is about to be checked
    if (event.target.checked) {
      if (valsWithLabel) {
        copy.push({ [labelAccessor]: label, [valueAccessor]: value });
      } else {
        copy.push(value);
      }
    } else {
      //if checkbox is about to be unchecked
      // we also want to remove that value from the copied array
      if (valsWithLabel) {
        copy = copy.filter((item) => {
          if (valueAccessor in item) {
            return item[valueAccessor] !== value;
          } else {
            return item !== value;
          }
        });
      } else {
        copy = copy.filter((item) => item !== value);
      }
    }
    //handler will now set the new array as the new value of this inputKey's state
    props.stateHandler(copy);
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
      <fieldset className={classes.root}>
        <legend className={styles.Checkbox__legend}>{props.legend}</legend>
        {options.map((option, index) => {
          let checked = false;
          const value = option[valueAccessor] || option;
          const label = option[labelAccessor] || option;
          props.value.forEach((item) => {
            if (typeof item === "object" && item !== null) {
              // since typeof null = 'object'
              if (valueAccessor in item) {
                if (item[valueAccessor] === value) {
                  checked = true;
                }
              }
            } else {
              if (item === value) {
                checked = true;
              }
            }
          });
          return (
            <div key={value} className={isFocused === index ? `${classes.inputWrap} ${classes._focused}` : classes.inputWrap}>
              {props.renderBeforeInput ? props.renderBeforeInput(option) : null}
              <Focus run={(isFocused) => (isFocused ? setIsFocused(index) : null)} keyBoardOnly={props.keyboardFocusOnly}>
                <input
                  id={value}
                  className={classes.input}
                  aria-describedby={`${value}-description`}
                  type="checkbox"
                  value={value}
                  name={id}
                  checked={checked}
                  onChange={(e) => checkboxHandler(e, value, label)}
                />
                <label className={classes.optionLabel} htmlFor={value}>
                  {label}
                </label>
                {props.renderAfterOptionLabel ? props.renderAfterOptionLabel(value, label) : null}
                {option.description ? (
                  <p id={`${value}-description`} className={classes.description}>
                    {option.description}
                  </p>
                ) : null}
              </Focus>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};

export default Checkbox;
