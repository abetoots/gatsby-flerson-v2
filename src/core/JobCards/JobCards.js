import "./JobCards.scss";

//Components
import JobCard from "@Components/JobCard/JobCard";
import React from "react";
import { ADD_ONS, APPLY_EMAIL, APPLY_URL, CATEGORY, EMPLOYER_NAME, EMPLOYER_WEBSITE, EXTRA_TAGS, LOCATION, POSITION } from "@Index/shared/utils/constants";

//TODO image
const JobCards = (props) => {
  return (
    <>
      {props.jobPosts.map((post) => (
        <JobCard
          key={post.id}
          highlight={post[ADD_ONS]?.customHighlight ? post[ADD_ONS].customHighlight : post[ADD_ONS].highlight}
          applyUrl={post[APPLY_URL] ? post[APPLY_URL] : post[APPLY_EMAIL]}
          employerName={post.hiringInfo[EMPLOYER_NAME]}
          employerWebsite={post.hiringInfo[EMPLOYER_WEBSITE]}
          imageNode={null}
          handleTagClick={props.handleTagClick}
          jobPosition={post[POSITION]}
          jobUrl={`${post.hiringInfo.slug}/${post.jobId}`}
          location={post[LOCATION]}
          primaryTag={post[CATEGORY].name}
          tags={post[EXTRA_TAGS] ? post[EXTRA_TAGS].split(",") : []}
        />
      ))}
    </>
  );
};

export default JobCards;
