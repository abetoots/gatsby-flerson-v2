import { CheckBoxElementConfig } from "@Components/Inputs/Checkbox/Checkbox";
import { InputElementConfig } from "@Components/Inputs/Input/Input";
import { SelectElementConfig } from "@Components/Inputs/Select/Select";
import { TextAreaElementConfig } from "@Components/Inputs/Textarea/Textarea";
import { UploadElementConfig, UploadState } from "@Components/composed/Upload/Upload";
import React from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

export type CheckboxOption = {
  value?: string;
  label?: string;
  description?: string;
  removes?: string;
  [accessor: string]: any;
};

export type SelectOption = {
  [statusKey: string]: any; // note: kinda hacky for index signature
};

export type BaseElementConfig = {
  cornerHintText?: string;
  heading: string;
  required?: boolean;
  renderAfterLabel?: () => React.ReactNode;
  errorText?: string;
  keyboardFocusOnly?: boolean;
  hiddenLabel?: boolean;
};

export type BaseUncontrolledInputProps = {
  inputKey: string;
  validation?: RegisterOptions;
};

type BaseInputConfig = {
  key: string;
  validation?: RegisterOptions;
  elementConfig: { [key: string]: any };
  removedBy?: string;
  description?: string;
};

type CheckboxInputConfig = BaseInputConfig & {
  elType: "checkbox";
  elementConfig: CheckBoxElementConfig;
  initialValue: any[];
};

type PasswordInputConfig = BaseInputConfig & {
  elType: "password";
  elementConfig: InputElementConfig;
  initialValue: string;
};

type TagsInputConfig = BaseInputConfig & {
  elType: "tags";
  elementConfig: BaseElementConfig & {
    placeholderText?: string;
  };
  initialValue: any[];
};

type InputConfig = BaseInputConfig & {
  elType: "input";
  elementConfig: InputElementConfig;
  initialValue: string | number | null | UploadState | any[];
};

type UploadConfig = BaseInputConfig & {
  elType: "file";
  elementConfig: UploadElementConfig;
  initialValue: string | number | null | UploadState | any[];
};

type SelectInputConfig = BaseInputConfig & {
  elType: "select";
  elementConfig: SelectElementConfig;
  initialValue: SelectOption;
};

type ToggleConfig = BaseInputConfig & {
  elType: "toggle";
  elementConfig: BaseElementConfig;
  initialValue: boolean;
};

type TextareaConfig = BaseInputConfig & {
  elType: "textarea";
  elementConfig: TextAreaElementConfig;
  initialValue: string;
};

export type InputGroupConfig =
  | InputConfig
  | UploadConfig
  | CheckboxInputConfig
  | SelectInputConfig
  | TextareaConfig
  | PasswordInputConfig
  | TagsInputConfig
  | ToggleConfig;
