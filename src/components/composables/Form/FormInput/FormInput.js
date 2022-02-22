import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./FormInput.module.scss";

//Components
import Checkbox from "@Components/bits/Inputs/checkbox/checkbox";
import Select from "@Components/bits/Inputs/select/select";
import Textarea from "@Components/bits/Inputs/textarea/textarea";
import Toggle from "@Components/bits/Inputs/toggle/toggle";
import Upload from "@Components/composables/Upload/Upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import file from "./paper.svg";
import Input from "@Components/bits/Inputs/Input";

import { exposeStyles } from "@Shared/api/styles";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    label: styles.FormInput__label,
    description: styles.FormInput__description,
  },
});

//TODO decide on exposing a styles api
const FormInput = (props) => {
  const classes = useStyles(props);
  //Default unexposed styles
  const {
    FormInput,
    FormInput__inputWrap,
    FormInput__icon,
    FormInput__defaultInput,
    FormInput__defaultInputLine,
    _withIcon,
    _focused = "_focused",
  } = styles;

  const rootRef = useRef(null);
  const inputWrapRef = useRef(null);

  //Whenever any descendant is focused, this captures it. We simply add a focus class
  const focusCaptureHandler = (e) => {
    if (e.type === "focus" && rootRef.current) {
      rootRef.current.classList.add(_focused);
    } else {
      rootRef.current.classList.remove(_focused);
    }
  };

  const inputLabel = props.label.toLowerCase().replace(/\s/g, "-");

  //classes for the div wrapping the <input/> element.
  let inputWrapClasses = FormInput__inputWrap;
  if (props.iconConfig && props.iconConfig.position === "inside") {
    inputWrapClasses = `${inputWrapClasses} ${_withIcon}`;
  }

  let inputElement;
  //Handle which FormInput element to return
  if (props.elType) {
    switch (props.elType) {
      case "textarea":
        inputElement = (
          <Textarea
            ariaLabelledBy={inputLabel}
            state={props.state[props.inputKey]}
            initialValue={props.initialValue}
            stateHandler={props.stateHandler}
            elementConfig={props.elementConfig}
          />
        );
        break;
      case "select":
        inputElement = (
          <Select
            ariaLabelledBy={inputLabel}
            state={props.state[props.inputKey]}
            initialValue={props.initialValue}
            stateHandler={props.stateHandler}
            elementConfig={props.elementConfig}
          />
        );
        break;
      case "checkbox":
        inputElement = (
          <Checkbox
            ariaLabelledBy={inputLabel}
            state={props.state[props.inputKey]}
            name={props.inputKey}
            initialValue={props.initialValue}
            stateHandler={props.stateHandler}
            keyBoardFocusOnly={props.elementConfig.keyBoardFocusOnly}
            elementConfig={props.elementConfig}
            label={props.label}
          />
        );
        break;

      case "toggle":
        inputElement = (
          <Toggle
            ariaLabelledBy={inputLabel}
            state={props.state[props.inputKey]}
            initialValue={props.initialValue}
            stateHandler={props.stateHandler}
          />
        );
        break;

      case "input":
        switch (props.elementConfig.type) {
          case "file":
            inputElement = (
              <Upload
                state={props.state[props.inputKey]}
                stateHandler={props.stateHandler}
                label={props.label}
                elementConfig={props.elementConfig}
                placeholder={file}
              />
            );
            break;
          default:
            inputElement = (
              <Input
                classes={{
                  root: FormInput__defaultInput,
                  line: FormInput__defaultInputLine,
                  _focused: _focused,
                }}
                state={props.state[props.inputKey]}
                stateHandler={props.stateHandler}
                elementConfig={props.elementConfig}
                ariaLabelledBy={inputLabel}
              />
            );
            break;
        }
        break; // end 'FormInput' elType
      default:
        return;
    }
  }

  let iconLabel;
  if (props.iconConfig) {
    iconLabel = (
      <FontAwesomeIcon
        className={FormInput__icon}
        icon={props.iconConfig.icon}
      />
    );
  }

  let description;
  if (props.renderDescription) {
    description = (
      <span className={classes.description}>{props.renderDescription()}</span>
    );
  } else if (props.description) {
    description = (
      <span className={classes.description}>{props.description}</span>
    );
  }

  return (
    <div
      ref={rootRef}
      className={FormInput}
      onFocusCapture={focusCaptureHandler}
      onBlurCapture={focusCaptureHandler}
    >
      <label id={inputLabel} className={classes.label}>
        {props.renderLabel ? props.renderLabel() : props.label}
        {iconLabel}
      </label>
      {description}
      <section className={inputWrapClasses} ref={inputWrapRef}>
        {props.renderInput ? props.renderInput() : inputElement}
      </section>
    </div>
  );
};

FormInput.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  elementConfig: PropTypes.object,
  elType: PropTypes.string,
  iconConfig: PropTypes.shape({
    position: PropTypes.oneOf(["inside", "outside"]),
    icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }),
  initialValue: PropTypes.any,
  label: PropTypes.string.isRequired,
  inputKey: PropTypes.string,
  renderDescription: PropTypes.func,
  renderInput: PropTypes.func,
  renderLabel: PropTypes.func,
  state: PropTypes.object,
  stateHandler: PropTypes.func,
};

export default FormInput;
