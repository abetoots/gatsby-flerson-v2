//Misc
import InputLabel from "@Components/bits/Inputs/Label/Label";
import { BaseElementConfig } from "@Index/shared/utils/types";
import { exposeStyles } from "@Shared/api/styles";
import React, { useRef } from "react";

import Choose from "./Controls/choose";
import Remove from "./Controls/remove";
//Components
import Preview from "./Preview/Preview";
import * as styles from "./Upload.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  merge: {
    parent: "",
  },
  replace: {
    root: styles.Upload,
  },
});

export type UploadElementConfig = BaseElementConfig & {
  maxMb?: number;
  renderControls?: (uploadInputRef: React.RefObject<HTMLInputElement>) => React.ReactNode;
  accept?: string;
};

export type UploadState = {
  preview: string;
  file: File | null;
  url: string;
};

type UploadProps = UploadElementConfig & {
  state: UploadState;
  stateHandler: (newState: UploadState) => void;
};

//Component API Type: Composable (see Opinions.md)
const Upload = ({ accept = "image/*", ...props }: UploadProps) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");

  const uploadInputRef = useRef<HTMLInputElement>(null);

  const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    //Return when user doesn't select anything
    if (event.target.files.length === 0) {
      return;
    }

    if (props.maxMb && event.target.files[0].size / 1024 > props.maxMb * 1024) {
      alert(`File size cannot be larger than ${props.maxMb} MB`);
      return;
    }

    if (props.state.preview) {
      //TODO link to explanation
      //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
      //can use that URL to gain access to your file
      URL.revokeObjectURL(props.state.preview);
    }

    //Make a state copy then merge new values
    const file = event.target.files[0];
    props.stateHandler({
      ...props.state,
      file: file,
      preview: URL.createObjectURL(file),
    });
  };

  //Preview box
  let preview;

  //Controls
  let controls;
  if (props.renderControls) {
    controls = props.renderControls(uploadInputRef);
  } else {
    //The default preview provided
    preview = <Preview state={props.state} />;
    //The default controls provided
    controls = (
      <>
        <Choose state={props.state} uploadInputRef={uploadInputRef} />
        <Remove state={props.state} stateHandler={props.stateHandler} />
      </>
    );
  }
  //End controls

  return (
    <div className={classes.parent}>
      <InputLabel
        label={props.heading}
        htmlFor={id}
        required={props.required}
        cornerHintText={props.cornerHintText}
        renderAfterLabel={props.renderAfterLabel}
      />
      <div className={classes.root}>
        {preview}
        {controls}
      </div>
      <input className={styles.Upload__input} type="file" accept={accept} onChange={fileInputHandler} ref={uploadInputRef} />
    </div>
  );
};

export default Upload;
