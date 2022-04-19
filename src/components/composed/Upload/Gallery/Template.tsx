import Button from "@Components/Button/Button";
import React from "react";
import * as styles from "./Template.module.scss";

type TemplateProps = {
  type: "file" | "image";
  fileName: string;
  fileSize: number;
  url: string;
  onDelete: () => void;
};

const Template = ({ type, fileName, fileSize, url, onDelete }: TemplateProps) => {
  let textContent;
  if (fileSize > 1024) {
    if (fileSize > 1048576) {
      textContent = Math.round(fileSize / 1048576) + "mb";
    } else {
      textContent = Math.round(fileSize / 1024) + "kb";
    }
  } else {
    textContent = fileSize + "b";
  }

  let previewWrapClasses;
  let overlayIconClasses;
  let overlayTextClasses;
  let buttonClasses;
  if (type === "file") {
    previewWrapClasses = `${styles.Template__previewWrap} ${styles._hasFile}`;
    overlayIconClasses = `${styles.Template__overlayIcon} ${styles._hasFile}`;
    overlayTextClasses = `${styles.Template__overlayText} ${styles._hasFile}`;
    buttonClasses = `${styles.Template__button} ${styles._hasFile}`;
  } else {
    previewWrapClasses = `${styles.Template__previewWrap} ${styles._hasImage}`;
    overlayIconClasses = `${styles.Template__overlayIcon} ${styles._hasImage}`;
    overlayTextClasses = `${styles.Template__overlayText} ${styles._hasImage}`;
    buttonClasses = `${styles.Template__button} ${styles._hasImage}`;
  }

  let icon;
  if (type === "file") {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
      </svg>
    );
  } else {
    icon = (
      <svg className="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
      </svg>
    );
  }
  return (
    <li className={styles.Template}>
      <div tabIndex={0} className={previewWrapClasses}>
        <img alt={fileName} src={url} className={styles.Template__preview} />

        <section className={styles.Template__overlay}>
          <span className={styles.Template__overlayHeading}>{fileName}</span>
          <div className={styles.Template__overlayItemsWrap}>
            <span className={overlayIconClasses}>
              <i>{icon}</i>
            </span>
            <span className={overlayTextClasses}>{textContent}</span>
            <Button classes={{ root: buttonClasses }} onClick={() => onDelete()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
              </svg>
            </Button>
          </div>
        </section>
      </div>
    </li>
  );
};

export default Template;
