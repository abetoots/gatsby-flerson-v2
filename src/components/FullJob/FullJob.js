import React from "react";
import PropTypes from "prop-types";
import "./FullJob.scss";

//Components
import Tags from "@Components/bits/Tags/Tags";
import JobImage from "@Components/JobImage/JobImage";
import JobApplyButton from "@Components/JobApplyButton/JobApplyButton";

const FullJob = (props) => {
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

  return (
    <div className="FullJob">
      <section className="FullJob__head">
        <JobImage
          showImage={props.showLogo}
          classes={{
            wrap: "FullJob__imageWrap",
            initialsWrap: "FullJob__initialsWrap",
          }}
          isPreview={props.isPreview}
          initials={initials}
          image={props.image}
          alt={`logo of ${props.employerName}`}
        />

        <div className="FullJob__headDetails">
          <div>
            <h1>{props.jobPosition}</h1>
            <h2>
              <a
                className="FullJob__employerUrl"
                href={props.employerUrl}
                rel="noopener noreferrer nofollow"
                target="_blank"
              >
                {props.employerName}
              </a>
            </h2>
            <span style={{ fontSize: ".8em" }}>Accepts: {props.location}</span>
          </div>
          <div>
            <div>
              <h3 style={{ display: "inline-block" }}>Salary:</h3>{" "}
              <span>${props.salary}</span>
            </div>
            <div>
              <h3 style={{ display: "inline-block" }}>Salary Type:</h3>{" "}
              <span>{props.salaryType}</span>
            </div>
            <div>
              <h3 style={{ display: "inline-block" }}>Employment:</h3>{" "}
              <span> {props.employmentType}</span>
            </div>
          </div>
        </div>

        <Tags
          classes={{
            root: "FullJob__tags",
            tag: "FullJob__tag",
            primaryTag: "FullJob__tag _primary",
          }}
          hasPrimaryTag={true}
          primaryTag={props.primaryTag}
          tags={props.tags}
          handleClick={props.handleTagClick}
        />

        <JobApplyButton
          applyUrl={props.applyUrl}
          disabled={props.isPreview}
          classes={{ root: "FullJob__applyButton" }}
        />
      </section>
      <section className="FullJob__description">
        {description}
        {howToApply}
      </section>
    </div>
  );
};

FullJob.defaultProps = {
  isPreview: false,
};

FullJob.propTypes = {
  applyUrl: PropTypes.string.isRequired,
  employerName: PropTypes.string.isRequired,
  employerUrl: PropTypes.string,
  description: PropTypes.node.isRequired,
  employmentType: PropTypes.string.isRequired,
  howToApply: PropTypes.node,
  handleTagClick: PropTypes.func.isRequired,
  isPreview: PropTypes.bool,
  jobPosition: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  primaryTag: PropTypes.string.isRequired,
  salary: PropTypes.string,
  salaryType: PropTypes.string,
  showLogo: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default FullJob;
