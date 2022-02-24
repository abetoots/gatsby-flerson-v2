//Components
import Tags from "@Components/bits/Tags/Tags";
import Focus from "@Components/hoc/Focus/Focus";
import JobApplyButton from "@Components/JobApplyButton/JobApplyButton";
import JobImage from "@Components/JobImage/JobImage";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./JobCard.module.scss";

const JobCard = (props) => {
  const navigateHandler = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      navigate(props.jobUrl);
    }
  };

  let initials;
  let subStr = props.companyName.toUpperCase().split(" ");
  initials = `${subStr[0].charAt(0)}${subStr[1] ? subStr[1].charAt(0) : ""}`;

  let companyName = props.companyName;
  if (props.companyWebsite) {
    companyName = (
      <a
        className={styles.JobCard__companyLink}
        href={props.companyWebsite}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {props.companyName}
      </a>
    );
  }

  //Handle add ons related to highlighting
  let rootStyle = null;
  let rootClass = `${styles.JobCard} ${styles._default}`;
  if (props.normalHighlight) {
    rootClass = `${rootClass} ${styles._highlighted}`;
  } else if (props.customHighlight) {
    rootStyle = {
      backgroundColor: `${props.customHighlight}`,
    };
  }

  return (
    <Focus focusClass={styles._focused} keyBoardOnly>
      <div
        className={rootClass}
        onClick={navigateHandler}
        onKeyDown={navigateHandler}
        tabIndex={0}
        role="link"
        style={rootStyle}
      >
        {/* <JobImage
          showImage={props.showImage}
          isPreview={props.isPreview}
          initials={initials}
          image={props.image}
          alt={`logo of ${props.companyName}`}
        /> */}

        <div>
          <h3 className={styles.JobCard__companyName}>{companyName}</h3>
          <h2>{props.jobPosition}</h2>
          <span style={{ fontSize: ".8em" }}>Accepts: {props.location}</span>
        </div>

        <Tags
          classes={{
            root: styles.JobCard__tags,
            tag: styles.JobCard__tag,
            primaryTag: `${styles.JobCard__tag} ${styles._primary}`,
          }}
          hasPrimaryTag={true}
          primaryTag={props.primaryTag}
          tags={props.tags}
          handleClick={props.handleTagClick}
        />

        <JobApplyButton
          applyUrl={props.isPreview ? "" : props.applyUrl}
          classes={{ root: styles.JobCard__applyButton }}
        />
      </div>
    </Focus>
  );
};

JobCard.defaultProps = {
  applyUrl: "",
  isPreview: false,
  keyBoardFocusOnly: false,
};

JobCard.propTypes = {
  applyUrl: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  companyWebsite: PropTypes.string,
  customHighlight: PropTypes.string,
  handleTagClick: PropTypes.func.isRequired,
  isPreview: PropTypes.bool,
  jobUrl: PropTypes.string.isRequired,
  jobPosition: PropTypes.string.isRequired,
  keyBoardFocusOnly: PropTypes.bool,
  location: PropTypes.string.isRequired,
  normalHighlight: PropTypes.bool,
  primaryTag: PropTypes.string,
  showImage: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default JobCard;
