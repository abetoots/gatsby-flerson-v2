//Components
import Tags, { TagsProps } from "@Components/Tags/Tags";
import Focus from "@Components/hoc/Focus/Focus";
import JobApplyButton from "@Components/JobApplyButton/JobApplyButton";
import JobImage from "@Components/JobImage/JobImage";
import { navigate } from "gatsby";
import React from "react";

import * as styles from "./JobCard.module.scss";
import { ImageDataLike } from "gatsby-plugin-image";

export type JobCardProps = Omit<TagsProps, "classes" | "onClick"> & {
  imageNode?: ImageDataLike;
  jobUrl: string;
  employerName: string;
  employerWebsite?: string;
  highlight?: boolean | string;
  jobPosition: string;
  location: string;
  handleTagClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string, isPrimaryTag: boolean) => void;
  applyUrl: string;
  renderImage?: (noImage: JSX.Element) => JSX.Element;
};

const JobCard = (props: JobCardProps) => {
  let initials;
  let subStr = props.employerName.toUpperCase().split(" ");
  initials = `${subStr[0].charAt(0)}${subStr[1] ? subStr[1].charAt(0) : ""}`;

  let companyName: React.ReactNode;
  if (props.employerWebsite) {
    companyName = (
      <a className={styles.JobCard__companyLink} href={props.employerWebsite} target="_blank" rel="noopener noreferrer nofollow">
        {props.employerName}
      </a>
    );
  } else {
    companyName = props.employerName;
  }

  //Handle add ons related to highlighting
  let rootStyle = {};
  let rootClass = `${styles.JobCard} ${styles._default}`;
  if (props.highlight) {
    //normal highlight
    if (typeof props.highlight === "boolean" && props.highlight === true) {
      rootClass = `${rootClass} ${styles._highlighted}`;
    } else if (props.highlight) {
      //custom highlight
      rootStyle = {
        backgroundColor: `${props.highlight}`,
      };
    }
  }

  let image = (
    <div className={styles.JobCard__initialsWrap}>
      <div className={styles.JobCard__initials}>{initials}</div>
    </div>
  );
  if (props.renderImage) {
    image = props.renderImage(image);
  } else {
    if (props.imageNode) {
      image = <JobImage imageNode={props.imageNode} alt={`logo of ${props.employerName}`} />;
    }
  }

  return (
    <Focus applyClassName={styles._focused} keyBoardOnly>
      <div
        className={rootClass}
        onClick={() => navigate(props.jobUrl)}
        onKeyDown={(e) => e.key === "Enter" && navigate(props.jobUrl)}
        tabIndex={0}
        role="link"
        style={rootStyle}
      >
        {image}

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
          primaryTag={props.primaryTag}
          tags={props.tags}
          onClick={props.handleTagClick}
        />

        <JobApplyButton applyUrl={props.applyUrl} classes={{ root: styles.JobCard__applyButton }} />
      </div>
    </Focus>
  );
};

export default JobCard;
