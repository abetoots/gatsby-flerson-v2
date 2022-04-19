import React from "react";
import { UploadState } from "../Upload";
import * as styles from "./Gallery.module.scss";
import Template from "./Template";
type GalleryProps = {
  heading?: string;
  renderHeading?: () => React.ReactNode;
  items: UploadState[];
  onDelete: (item: UploadState) => void;
};

const Gallery = ({ heading = "To Upload", onDelete, ...props }: GalleryProps) => {
  // using two similar templates for simplicity in js code

  const empty = (
    <li className={styles.Gallery__empty}>
      <img src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
      <span>No files selected</span>
    </li>
  );
  return (
    <section>
      {props.renderHeading ? props.renderHeading() : <h4 className={styles.Gallery__heading}>{heading}</h4>}{" "}
      <ul className={styles.Gallery}>
        {props.items.length === 0
          ? empty
          : props.items.map((item) => (
              <Template
                fileName={item.file.name}
                fileSize={item.file.size}
                type={item.file.type.match("image.*") ? "image" : "file"}
                url={item.url}
                key={item.file.name}
                onDelete={() => onDelete(item)}
              />
            ))}
      </ul>
    </section>
  );
};

export default Gallery;
