//Misc
import InputLabel from "@Components/Inputs/Label/Label";
import { BaseElementConfig } from "@Index/shared/utils/types";
import { exposeStyles } from "@Shared/api/styles";
import React, { useRef } from "react";

import Choose from "./Controls/choose";
import Remove from "./Controls/remove";
import Gallery from "./Gallery/Gallery";
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
  uploadLabel?: string;
  trailingLabel?: string | (() => React.ReactNode);
  afterLabel?: string | (() => React.ReactNode);
  allowMultiple?: boolean;
  overlayText?: string;
  enableGallery?: boolean;
  renderAfter?: () => React.ReactNode;
};

export type UploadState = {
  file: File;
  url: string;
};

type UploadProps = UploadElementConfig & {
  state: UploadState[];
  stateHandler: (newState: UploadState[]) => void;
};

//Component API Type: Composable (see Opinions.md)
const Upload = ({
  accept = "image/*",
  uploadLabel = "Upload a file",
  trailingLabel = "or drag and drop",
  maxMb = 10,
  afterLabel = "PNG, JPG, GIF up to",
  allowMultiple = true,
  overlayText = "Drop files to upload",
  enableGallery = true,
  ...props
}: UploadProps) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  const id = props.heading.toLowerCase().replace(/\s/g, "-");

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const overLayRef = useRef<HTMLDivElement>(null);

  const addFileInputHandler = (files: FileList | null) => {
    if (!files) {
      return;
    }
    //Return when user doesn't select anything
    if (files.length === 0) {
      return;
    }

    if (maxMb) {
      for (const file of files) {
        if (file.size / 1024 > maxMb * 1024) {
          return alert(`File size cannot be larger than ${maxMb} MB`);
        }
      }
    }

    // if (props.state.preview) {
    //   //TODO link to explanation
    //   //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
    //   //can use that URL to gain access to your file
    //   URL.revokeObjectURL(props.state.preview);
    // }

    let copy = [...props.state];
    if (allowMultiple) {
      for (const file of files) {
        copy.push({ file, url: URL.createObjectURL(file) });
      }
    } else {
      copy = [{ file: files[0], url: URL.createObjectURL(files[0]) }];
    }

    //Make a state copy then merge new values
    props.stateHandler(copy);
  };

  const removeItemHandler = (stateItem: UploadState) => {
    let copy = [...props.state];
    //   //TODO link to explanation
    //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
    //can use that URL to gain access to your file
    URL.revokeObjectURL(stateItem.url);
    copy = copy.filter((item) => item.url !== stateItem.url);
    props.stateHandler(copy);
  };

  // use to check if a file is being dragged
  const hasFiles = ({ dataTransfer: { types = [] } }: React.DragEvent<HTMLDivElement>) => types.indexOf("Files") > -1;

  // use to drag dragenter and dragleave events.
  // this is to know if the outermost parent is dragged over
  // without issues due to drag events on its children
  const counterRef = useRef(0);

  // only react to actual files being dragged
  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!hasFiles(e)) {
      return;
    }
    ++counterRef.current && overLayRef.current?.classList.add(styles._draggedOver);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    1 > --counterRef.current && overLayRef.current?.classList.remove(styles._draggedOver);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    addFileInputHandler(e.dataTransfer.files);
    overLayRef.current?.classList.remove(styles._draggedOver);
    counterRef.current = 0;
  };

  return (
    <div
      ref={parentRef}
      className={classes.parent}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      <InputLabel
        label={props.heading}
        htmlFor={id}
        required={props.required}
        cornerHintText={props.cornerHintText}
        renderAfterLabel={props.renderAfterLabel}
      />
      <div className={classes.root}>
        <section className={styles.Upload__inputSection}>
          <div ref={overLayRef} className={styles.Upload__overlay}>
            <i>
              <svg className="fill-current w-12 h-12 mb-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
            </i>
            <p className={styles.Upload__overlayText}>{overlayText}</p>
          </div>
          <div>
            <svg className={styles.Upload__photo} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className={styles.Upload__instructionWrap}>
              <label htmlFor="file-upload" className={styles.Upload__instruction}>
                <span>{uploadLabel}</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className={styles.Upload__input}
                  ref={uploadInputRef}
                  onChange={(e) => addFileInputHandler(e.target.files)}
                  accept={accept}
                  multiple={allowMultiple}
                />
              </label>
              {trailingLabel ? (
                typeof trailingLabel === "function" ? (
                  trailingLabel()
                ) : (
                  <span className={styles.Upload__trailingLabel}>{trailingLabel}</span>
                )
              ) : null}
            </div>
            {afterLabel ? (
              typeof afterLabel === "function" ? (
                afterLabel()
              ) : (
                <span className={styles.Upload__afterLabel}>{`${afterLabel} ${maxMb} MB`}</span>
              )
            ) : null}
          </div>
        </section>
        {enableGallery ? <Gallery items={props.state} onDelete={removeItemHandler} /> : null}
        {props.renderAfter ? props.renderAfter() : null}
      </div>
    </div>
  );
};

export default Upload;
