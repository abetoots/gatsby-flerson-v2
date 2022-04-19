import "./FullJob.scss";

//Components
import Tags from "@Components/Tags/Tags";
import JobApplyButton from "@Components/JobApplyButton/JobApplyButton";
import JobImage from "@Components/JobImage/JobImage";
import React from "react";
import { JobCardProps } from "@Components/JobCard/JobCard";

type FullJobProps = JobCardProps & {
  description?: string;
  howToApply?: string;
  employerUrl: string;
  salary: number;
  salaryType: string;
  employmentType: string;
};

const FullJob = (props: FullJobProps) => {
  let initials;
  let subStr = props.employerName.toUpperCase().split(" ");
  initials = `${subStr[0].charAt(0)}${subStr[1] ? subStr[1].charAt(0) : ""}`;

  let description;
  if (props.description) {
    description = (
      <>
        <h2>Job Description:</h2>
        {props.description}
      </>
    );
  }

  let howToApply;
  if (props.howToApply) {
    howToApply = (
      <>
        <h2>How To Apply:</h2>
        {props.howToApply}
      </>
    );
  }

  let image = (
    <div className="FullJob__initialsWrap">
      <div className="FullJob__initials">{initials}</div>
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
    <div className="FullJob">
      <div className="FullJob__head">
        <section>{image}</section>

        <section className="FullJob__headDetails">
          <div>
            <h1 className="FullJob__jobPosition">{props.jobPosition}</h1>
            <h2>
              <a className="FullJob__employerUrl" href={props.employerUrl} rel="noopener noreferrer nofollow" target="_blank">
                {props.employerName}
              </a>
            </h2>
            <p style={{ fontSize: ".8em" }}>
              Accepts: <span>{props.location}</span>
            </p>
          </div>
          <div>
            <p>
              Salary: <span>${props.salary}</span>
            </p>
            <p>
              Salary Type: <span>{props.salaryType}</span>
            </p>
            <p>
              Employment: <span> {props.employmentType}</span>
            </p>
          </div>
        </section>

        <section className="FullJob__tags">
          <Tags
            classes={{
              tag: "FullJob__tag",
              primaryTag: "FullJob__tag _primary",
            }}
            primaryTag={props.primaryTag}
            tags={props.tags}
            onClick={props.handleTagClick}
          />
        </section>

        <JobApplyButton applyUrl={props.applyUrl} classes={{ root: "FullJob__applyButton" }} />
      </div>
      <div className="FullJob__description">
        {description}
        {howToApply}
      </div>
    </div>
  );
};

export default FullJob;
