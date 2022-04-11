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
    <div className={"FullJob__initialsWrap"}>
      <div className={"FullJob__intitials"}>{initials}</div>
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
      <section className="FullJob__head">
        {image}

        <div className="FullJob__headDetails">
          <div>
            <h1>{props.jobPosition}</h1>
            <h2>
              <a className="FullJob__employerUrl" href={props.employerUrl} rel="noopener noreferrer nofollow" target="_blank">
                {props.employerName}
              </a>
            </h2>
            <span style={{ fontSize: ".8em" }}>Accepts: {props.location}</span>
          </div>
          <div>
            <div>
              <h3 style={{ display: "inline-block" }}>Salary:</h3> <span>${props.salary}</span>
            </div>
            <div>
              <h3 style={{ display: "inline-block" }}>Salary Type:</h3> <span>{props.salaryType}</span>
            </div>
            <div>
              <h3 style={{ display: "inline-block" }}>Employment:</h3> <span> {props.employmentType}</span>
            </div>
          </div>
        </div>

        <Tags
          classes={{
            root: "FullJob__tags",
            tag: "FullJob__tag",
            primaryTag: "FullJob__tag _primary",
          }}
          primaryTag={props.primaryTag}
          tags={props.tags}
          onClick={props.handleTagClick}
        />

        <JobApplyButton applyUrl={props.applyUrl} classes={{ root: "FullJob__applyButton" }} />
      </section>
      <section className="FullJob__description">
        {description}
        {howToApply}
      </section>
    </div>
  );
};

export default FullJob;
