import "./JobCards.scss";

//Components
import JobCard from "@Components/JobCard/JobCard";
import React from "react";

//TODO image
const JobCards = (props) => {
  return (
    <>
      {props.jobPosts.map((post) => (
        <JobCard
          key={post.id}
          highlight={post.addOns?.customHighlight ? post.addOns?.customHighlight : post.addOns.highlight}
          applyUrl={post.applyUrl}
          employerName={post.hiringInfo.recruiter}
          employerWebsite={post.hiringInfo.website}
          imageNode={null}
          handleTagClick={props.handleTagClick}
          jobPosition={post.title}
          jobUrl={`jobs/${post.id}`}
          location={post.location}
          primaryTag={post.category.name}
          tags={post.tags.map((tag) => tag.name)}
        />
      ))}
    </>
  );
};

export default JobCards;
