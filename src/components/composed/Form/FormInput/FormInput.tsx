//Components
import Checkbox from "@Components/bits/Inputs/Checkbox/Checkbox";
import InputLine from "@Components/bits/Inputs/Input/InputLine";
import Select from "@Components/bits/Inputs/Select/Select";
import Textarea from "@Components/bits/Inputs/Textarea/Textarea";
import Toggle from "@Components/bits/Inputs/Toggle/Toggle";
import Upload from "@Components/composed/Upload/Upload";
import { BaseUncontrolledInputProps, InputGroupConfig } from "@Index/shared/utils/types";
import { useFormContext, useController, ControllerRenderProps, FieldValues, ControllerFieldState, FormState } from "react-hook-form";
import React, { useRef } from "react";

import * as styles from "./FormInput.module.scss";

type FormInputProps = InputGroupConfig &
  BaseUncontrolledInputProps & {
    inputKey: string;
    renderInput?: ({
      field,
      fieldState,
      formState,
    }: {
      field: ControllerRenderProps<FieldValues, string>;
      fieldState: ControllerFieldState;
      formState: FormState<FieldValues>;
    }) => React.ReactNode;
    renderAfterInput?: () => React.ReactNode;
  };

const FormInput = (props: FormInputProps) => {
  //Default unexposed styles
  const { FormInput, FormInput__description, FormInput__inputWrap, _focused = "_focused" } = styles;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputWrapRef = useRef(null);

  const { control, setValue, formState, watch } = useFormContext();
  const { field, fieldState } = useController({
    name: props.inputKey,
    control,
    rules: props.validation,
  });

  //Whenever any descendant is focused, this captures it. We simply add a focus class
  const focusCaptureHandler = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.type === "focus" && rootRef.current) {
      rootRef.current.classList.add(_focused);
    } else {
      rootRef.current && rootRef?.current.classList.remove(_focused);
    }
  };

  let description: React.ReactNode;
  if (props.description) {
    description = <span className={FormInput__description}>{props.description}</span>;
  }

  if (props.removedBy) {
    const val = watch(props.removedBy);
    if (!!val) {
      setValue(props.inputKey, null);
      return null;
    }
  }
  let input = null;
  if (!props.renderInput) {
    switch (props.elType) {
      case "select":
        input = (
          <Select
            {...props.elementConfig}
            value={field.value || props.initialValue}
            renderAfterLabel={() => description}
            onChange={field.onChange}
            required={!!props.validation?.required}
          />
        );
        break;
      case "checkbox":
        input = (
          <Checkbox
            value={field.value || props.initialValue}
            renderAfterLabel={() => description}
            stateHandler={(newVal) => {
              setValue(props.inputKey, newVal);
            }}
            valsWithLabel={props.elementConfig?.valsWithLabel}
            valueAccessor={props.elementConfig?.valueAccessor}
            labelAccessor={props.elementConfig?.labelAccessor}
            heading={props.elementConfig.heading}
            options={props.elementConfig.options}
            required={!!props.validation?.required}
            errorText={formState?.errors?.[props.inputKey]?.message}
          />
        );
        break;
      case "toggle":
        input = (
          <Toggle
            value={field.value || props.initialValue}
            renderAfterLabel={() => description}
            stateHandler={(newVal) => {
              setValue(props.inputKey, newVal);
            }}
            heading={props.elementConfig.heading}
            required={!!props.validation?.required}
          />
        );
        break;
      case "textarea":
        input = (
          <Textarea
            value={field.value || props.initialValue}
            renderAfterLabel={() => description}
            onChange={field.onChange}
            heading={props.elementConfig.heading}
            required={!!props.validation?.required}
          />
        );
        break;

      case "file":
        input = (
          <Upload
            heading={props.elementConfig.heading}
            state={field.value || props.initialValue}
            stateHandler={(newVal) => {
              setValue(props.inputKey, newVal);
            }}
            renderAfterLabel={() => description}
          />
        );
        break;
      case "input":
        input = (
          <InputLine
            type={props.elementConfig.type}
            placeholder={props.elementConfig.placeholder}
            value={field.value || props.initialValue}
            renderAfterLabel={() => description}
            onChange={field.onChange}
            heading={props.elementConfig.heading}
            required={!!props.validation?.required}
            errorText={formState?.errors?.[props.inputKey]?.message}
          />
        );
        break;
      default:
        break;
    }
  }
  return (
    <div ref={rootRef} className={FormInput} onFocusCapture={focusCaptureHandler} onBlurCapture={focusCaptureHandler}>
      <section className={FormInput__inputWrap} ref={inputWrapRef}>
        {props.renderInput ? props.renderInput({ field, fieldState, formState }) : input}
      </section>
      {props.renderAfterInput ? props.renderAfterInput() : null}
    </div>
  );
};

export default FormInput;
