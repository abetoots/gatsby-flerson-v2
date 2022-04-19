import { exposeStyles } from "@Shared/api/styles";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import React from "react";

import * as styles from "./JobImage.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    wrap: styles.JobImage__imageWrap,
  },
});

type JobImageProps = {
  imageNode: ImageDataLike;
  alt: string;
};

const JobImage = (props: JobImageProps) => {
  const classes = useStyles(props);
  //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  const image = getImage(props.imageNode)!;

  return (
    <div className={classes.wrap}>
      <GatsbyImage style={{ borderRadius: "8px" }} image={image} alt={props.alt} />
    </div>
  );
};

export default JobImage;
