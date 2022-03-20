import React from "react";
import Input, { DefaultInputProps } from "@Components/bits/Inputs/Input/Input";
import * as styles from "./InputLine.module.scss";
import { BaseElementConfig } from "@Index/shared/utils/types";

const InputLine = React.forwardRef<HTMLInputElement, DefaultInputProps & BaseElementConfig>((props, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      classes={{ root: styles.InputLine }}
      renderAfterInput={(isFocused) => {
        let lineClass = styles.InputLine__line;
        if (isFocused) {
          lineClass = `${lineClass} ${styles._focused}`;
        }
        return <div className={lineClass}></div>;
      }}
    />
  );
});

export default InputLine;
