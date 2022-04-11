import Spinner3 from "@Components/Spinner/spinner3/spinner3";
//Components
import JobCards from "@Core/JobCards/JobCards";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

//Misc
import { getStickyPosts, groupByDateAfterDaysAgo } from "./utils";

const ViewJobs = (props) => {
  const [postsByDate, setPostsByDate] = useState({
    today: [],
    yesterday: [],
    last7: [],
    last30: [],
  });

  console.log("props", props);

  const [stickyPosts, setStickyPosts] = useState([]);

  //Do some transforms to our jobPosts.
  useEffect(() => {
    const featuredPosts = getStickyPosts(props.jobPosts);
    console.log("featured", featuredPosts);
    const postsToday = groupByDateAfterDaysAgo(featuredPosts.remaining, 0, "created");
    const postsYesterday = groupByDateAfterDaysAgo(postsToday.remaining, 1, "created");
    const posts7DaysAgo = groupByDateAfterDaysAgo(postsYesterday.remaining, 7, "created");
    const posts30DaysAgo = groupByDateAfterDaysAgo(posts7DaysAgo.remaining, 30, "created");
    setStickyPosts(featuredPosts.results);
    setPostsByDate({
      today: postsToday.results,
      yesterday: postsYesterday.results,
      last7: posts7DaysAgo.results,
      last30: posts30DaysAgo.results,
    });
  }, [props.jobPosts]);

  let postsToday;
  if (postsByDate.today.length > 0) {
    postsToday = (
      <section>
        <h2>Today</h2>
        <JobCards jobPosts={postsByDate.today} handleTagClick={props.handleTagClick} />
      </section>
    );
  }

  let featuredPosts;
  if (stickyPosts.length > 0) {
    console.log("stickyPosts", stickyPosts);
    featuredPosts = (
      <section>
        <JobCards jobPosts={stickyPosts} handleTagClick={props.handleTagClick} />
      </section>
    );
  }

  let postsYesterday;
  if (postsByDate.yesterday.length > 0) {
    postsYesterday = (
      <section>
        <h2>Yesterday</h2>
        <JobCards jobPosts={postsByDate.yesterday} handleTagClick={props.handleTagClick} />
      </section>
    );
  }
  let postsLast7Days;
  if (postsByDate.last7.length > 0) {
    postsLast7Days = (
      <section>
        <h2>Last 7 Days</h2>
        <JobCards jobPosts={postsByDate.last7} handleTagClick={props.handleTagClick} />
      </section>
    );
  }
  let postsLast30Days;
  if (postsByDate.last30.length > 0) {
    postsLast30Days = (
      <section>
        <h2>Last 30 Days</h2>
        <JobCards jobPosts={postsByDate.last30} handleTagClick={props.handleTagClick} />
      </section>
    );
  }
  return props.loading ? (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Spinner3 />
    </div>
  ) : (
    <>
      {props.message ? <h1 style={{ textAlign: "center" }}>{props.message}</h1> : null}
      {featuredPosts}
      {postsToday}
      {postsYesterday}
      {postsLast7Days}
      {postsLast30Days}
    </>
  );
};

ViewJobs.propTypes = {
  jobPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  handleTagClick: PropTypes.func.isRequired,
};

export default ViewJobs;
