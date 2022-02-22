import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.scss";

//Components
import Button from "@Components/bits/Button/Button";
import Status from "./UI/Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Misc
import { exposeStyles } from "@Shared/api/styles";

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

//Component API Type: Composable -> <Status/>
const Form = forwardRef((props, ref) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  //Unexposed default styles
  const { Form__status, _success, _error } = styles;

  //Whenever any descendant is focused, this captures it. We simply add a focus class
  const focusCaptureHandler = (e) => {
    if (e.type === "focus") {
      e.target.classList.add(classes._focused);
    } else {
      e.target.classList.remove(classes._focused);
    }
  };

  let renderChildren;
  if (props.children) {
    renderChildren = React.Children.map(props.children, (child) => {
      //let prop types handle this
      if (child && child.type.displayName === Status.name) {
        return React.cloneElement(child, {
          error: props.error,
          success: props.success,
          loading: props.loading,
        });
      } else {
        return child;
      }
    });
  }

  let statusUi;
  if (props.showStatusUi) {
    let message = "";
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
  if (!props.disableSubmit) {
    button = (
      <Button
        classes={{ root: classes.button }}
        disabled={props.loading}
        type="submit"
        label={props.btnLabel}
      >
        {props.loading ? (
          <FontAwesomeIcon icon="spinner" spin />
        ) : (
          props.btnText || "Submit"
        )}
      </Button>
    );
  }

  return (
    <form
      role="form" //for some reason react testing library can't pickup the form by role. this fixes it
      ref={ref}
      className={classes.root}
      onSubmit={!props.disableSubmit ? props.handleSubmit : null}
      onFocusCapture={focusCaptureHandler}
      onBlurCapture={focusCaptureHandler}
    >
      {renderChildren}
      {button}
      {statusUi}
    </form>
  );
});

Form.displayName = "Form";

Form.defaultProps = {
  showStatusUi: true,
  disableSubmit: false,
  success: false,
  error: "",
};

Form.propTypes = {
  btnLabel: PropTypes.string,
  children: PropTypes.node,
  disableSubmit: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  showStatusUi: PropTypes.bool,
  success: PropTypes.bool,
};

export default Form;
