import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Input, { DefaultInputProps } from "@Components/Inputs/Input/Input";
import classNames from "classnames";
import * as styles from "./InputTailwind.module.scss";

type InputTailWindProps = DefaultInputProps & {
  helpText?: string;
};

const InputTailwind = React.forwardRef<HTMLInputElement, InputTailWindProps>(({ helpText, errorText, ...props }, ref) => {
  let helpInfo: React.ReactNode;
  if (helpText) {
    helpInfo = (
      <p className={styles.InputTailwind__helpInfo} id="description">
        {helpText}
      </p>
    );
  }

  let invalidText: React.ReactNode;
  let errorIcon: React.ReactNode;
  if (!!errorText) {
    invalidText = (
      <p className={styles.InputTailwind__invalidText} id="description">
        {errorText}
      </p>
    );
    errorIcon = (
      <div className={styles.InputTailwind__errorIcon}>
        <ExclamationCircleIcon aria-hidden="true" />
      </div>
    );
  }

  let trailingElement: React.ReactNode;
  if (props.trailingElement) {
    trailingElement = typeof props.trailingElement === "function" ? props.trailingElement() : props.trailingElement;
  }

  return (
    <Input
      {...props}
      ref={ref}
      classes={{
        root: classNames(styles.Input, {
          [styles._error]: errorText,
        }),
        _focused: errorText ? styles._errorFocus : styles._focused,
      }}
      trailingElement={() => (
        <>
          {errorIcon}
          {trailingElement}
        </>
      )}
      renderAfterInput={() => (
        <>
          {invalidText}
          {helpInfo}
        </>
      )}
    />
  );
});

export default InputTailwind;
