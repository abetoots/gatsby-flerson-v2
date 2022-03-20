import Preview from "@Components/composed/Upload/Preview/Preview";
import { exposeStyles } from "@Shared/api/styles";
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./JobImage.module.scss";

//STYLES API
//Define which styles of the component you want to expose. Only what you expose can be overridden.

//behavior: props.classes will MERGE/REPLACE what you exposed
const useStyles = exposeStyles({
  replace: {
    wrap: styles.JobImage__imageWrap,
    image: styles.JobImage__image,
    initialsWrap: styles.JobImage__initialsWrap,
    initials: styles.JobImage__initials,
  },
});

const JobImage = (props) => {
  const classes = useStyles(props);
  let image;
  if (props.image && props.showImage) {
    //if this is true, then there MUST be an image to show
    if (props.isPreview) {
      image = (
        <Preview
          state={props.image.preview}
          classes={{
            root: classes.wrap,
            image: classes.image,
          }}
        />
      );
    } else if (props.image.fluid) {
      image = (
        <div className={classes.wrap}>
          <GatsbyImage style={{ borderRadius: "8px" }} fluid={props.image.fluid} alt={props.alt} />
        </div>
      );
    } else if (props.image.fixed) {
      image = (
        <div className={classes.wrap}>
          <GatsbyImage fixed={props.image.fixed} alt={props.alt} />
        </div>
      );
    }
  } else {
    image = (
      <div className={classes.initialsWrap}>
        <div className={classes.initials}>{props.initials}</div>
      </div>
    );
  }
  return image;
};

JobImage.defaultProps = {
  isPreview: false,
  showImage: false,
};

JobImage.propTypes = {
  alt: PropTypes.string,
  image: PropTypes.object,
  preview: PropTypes.object,
  fluid: PropTypes.object,
  fixed: PropTypes.object,
  initials: PropTypes.string,
  isPreview: PropTypes.bool,
  showImage: PropTypes.bool,
};

export default JobImage;
