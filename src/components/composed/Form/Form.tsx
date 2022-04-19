//Components
import Button, { ButtonClasses } from "@Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Misc
import { exposeStyles } from "@Shared/api/styles";
import React, { forwardRef } from "react";

import * as styles from "./Form.module.scss";
import Status from "./UI/Status";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    root: styles.Form,
    button: styles.Form__submitBtn, //only used by the default submit button
    _focused: "_focused",
  },
});

type FormProps = React.PropsWithChildren<{
  loading?: boolean;
  success?: boolean;
  submitButton?: React.ReactNode | (() => React.ReactNode);
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  showStatusUi?: boolean;
  error?: boolean;
  submitText?: string;
  classes?: Partial<ReturnType<typeof useStyles>>;
}>;

//Component API Type: Composable -> <Status/>
const Form = forwardRef<HTMLFormElement, FormProps>(({ submitText = "Submit", ...props }, ref) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  //Unexposed default styles
  const { Form__status, _success, _error } = styles;

  //Whenever any descendant is focused, this captures it. We simply add a focus class
  const focusCaptureHandler = (e: React.FocusEvent<HTMLFormElement, Element>) => {
    if (e.type === "focus") {
      e.target.classList.add(classes._focused);
    } else {
      e.target.classList.remove(classes._focused);
    }
  };

  let statusUi;
  if (props.showStatusUi) {
    let message: React.ReactNode = "";
    let statusClass = Form__status;
    if (props.success) {
      statusClass = `${statusClass} ${_success}`;
      message = (
        <>
          Success
          <span role="img" aria-label="success">
            ✅
          </span>
        </>
      );
    }
    if (props.error) {
      statusClass = `${statusClass} ${_error}`;
      message = (
        <>
          {props.error}
          <span role="img" aria-label="error">
            ❌
          </span>
        </>
      );
    }
    statusUi = (
      <Status
        success={props.success}
        error={props.error}
        classes={{
          root: statusClass,
        }}
      >
        {message}
      </Status>
    );
  }

  //default: submit button is shown unless specifically disabled
  let button;
  if (props.submitButton || props.submitButton === null) {
    button = typeof props.submitButton === "function" ? props.submitButton() : props.submitButton;
  } else {
    button = <FormSubmitButton loading={props.loading} classes={{ root: classes.button }} submitText={submitText} />;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <form
      role="form" //for some reason react testing library can't pickup the form by role. this fixes it
      ref={ref}
      className={classes.root}
      onSubmit={props.onSubmit}
      onFocusCapture={focusCaptureHandler}
      onBlurCapture={focusCaptureHandler}
    >
      {props.children}
      {button}
      {statusUi}
    </form>
  );
});

export const FormSubmitButton = ({ classes, loading, submitText = "Submit" }: { classes: ButtonClasses; loading?: boolean; submitText?: string }) => (
  <Button classes={classes} disabled={loading} type="submit">
    {loading ? <FontAwesomeIcon icon="spinner" spin /> : submitText}
  </Button>
);

export default Form;
