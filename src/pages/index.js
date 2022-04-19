import "./index.scss";

//Components
import Button from "@Components/Button/Button";
import Search from "@Components/Search/Search";
import Layout from "@Components/layout";
import SEO from "@Components/seo";
import JobFilters from "@Core/JobFilters/JobFilters";
import ToggleJobs from "@Core/ToggleJobs/ToggleJobs";
import ViewJobs from "@Core/ViewJobs/ViewJobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchIcon3 } from "@Images/search-icons";
import axios from "axios";
//Misc
import { graphql, navigate } from "gatsby";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const IndexPage = ({ data, location }) => {
  //SETUP
  //create a hash table with key-value pairs of jobId = indexInNodesArray
  const jobIndex = useMemo(() => ({}), []);
  data.allMongodbEngineJobs.nodes.forEach((node, arrayIndex) => {
    jobIndex[node.id] = arrayIndex;
  });
  const jobNodes = data.allMongodbEngineJobs.nodes;
  //STATE
  /**
   * On the top-level, we have three sets of job posts that are useful for different cases
   * 1) The 'nodes' contains ALL our job posts given to us by gatsby at build time. Useful for referencing
   * all the original job posts (no transforms or filters applied)
   * 2) The 'current' job posts contains posts that have been transformed in some way. Useful for referencing
   * the job posts in the current context (applied filters, other transforms).
   * 3) The 'fetched' job posts are self-explanatory. Useful for referencing
   * all the original fetched posts (no transforms or filters applied)
   *
   */
  const [currentJobPosts, setCurrentJobPosts] = useState(jobNodes);
  console.log("jobNodes", jobNodes);
  const [fetchedPosts, setFetchedPosts] = useState([]);

  const [searchState, setSearchState] = useState("");
  const [showJobFilters, setShowJobFilters] = useState(false);
  const [activeTag, setActiveTag] = useState("");

  const params = new URLSearchParams(location.search);
  //EFFECTS
  //only starts query when enabled = true
  const { isLoading: searching, data: searchData } = useQuery(
    ["searchJobsKey", location.search],
    async () => {
      const { data } = await axios.get(`/.netlify/functions/jobs?q=${searchState}`);
      return data;
    },
    { enabled: location.pathname === "/filter" && params.has("search") },
  );

  //only starts query when enabled = true
  const { isLoading: searchingByTag, data: searchByTagData } = useQuery(
    ["searchJobsByTagKey", location.search],
    async () => {
      let k = "tag" in params ? "tags" : "category";

      const { data } = await axios.get(`/.netlify/functions/jobs?${k}=${searchState}`);
      if (params.has("tag")) {
        setActiveTag(params.get("tag"));
      }
      return data;
    },
    {
      enabled: location.pathname === "/filter" && (params.has("tag") || params.has("category")),
    },
  );

  /**
   * Listen to the fired queries, find if any jobs returned by our queries have a match in our jobIndex
   * then set those as the new jobPosts to be displayed. also, store them so we can revert to it later
   */
  useEffect(() => {
    if (searchData) {
      const newJobPosts = [];
      searchData.jobPosts.nodes.forEach((post) => {
        //if the id exists as a key in the job index
        if (jobIndex[post.id] !== undefined) {
          //careful since 0 is falsy, so check if undefined instead
          //the value of that key is the job post's array index in the nodes array
          newJobPosts.push(jobNodes[jobIndex[post.id]]);
        }
      });
      setCurrentJobPosts(newJobPosts);
      setFetchedPosts(newJobPosts);
    }

    if (searchByTagData) {
      const newJobPosts = [];
      searchByTagData.jobPosts.nodes.forEach((post) => {
        //if the id exists as a key in the job index
        if (jobIndex[post.id] !== undefined) {
          //careful since 0 is falsy, so check if undefined instead
          //the value of that key is the job post's array index in the nodes array
          newJobPosts.push(jobNodes[jobIndex[post.id]]);
        }
      });
      setCurrentJobPosts(newJobPosts);
      setFetchedPosts(newJobPosts);
    }
  }, [searchData, searchByTagData, jobIndex, jobNodes]);

  //HANDLERS
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/filter?search=${searchState}`);
  };

  const mobileFiltersHandler = (e) => {
    e.preventDefault();
    setShowJobFilters((prevState) => !prevState);
  };

  const tagClickHandler = (e, tag, isPrimary) => {
    e.stopPropagation(); //prevent parent's click handler
    isPrimary ? navigate(`/filter?category=${tag}`) : navigate(`/filter?tag=${tag}`);
  };

  let message;
  if (currentJobPosts.length === 0) {
    message = "No job posts found";
  } else if (activeTag) {
    message = `Job posts tagged "${activeTag}"`;
  }

  return (
    <Layout mainStyle={{ backgroundColor: "#f1f5f9", padding: "1.5rem" }}>
      <SEO />
      <section className="Home__searchWrap">
        <Search
          classes={{
            root: "Home__searchForm",
            input: "Home__searchInput",
          }}
          buttonIcon={searchIcon3}
          handleSubmit={searchHandler}
          state={searchState}
          stateHandler={setSearchState}
          label="Search job posts"
          enableAutoSearch={false}
          showLabel={false}
          placeholder="Search for jobs"
        />
        <Button
          classes={{
            root: "Home__showFiltersButton",
          }}
          onClick={mobileFiltersHandler}
        >
          <FontAwesomeIcon icon="filter" />
        </Button>
      </section>
      <section className="Home__filtersWrap">
        <JobFilters
          currentContextPosts={location.pathname === "/" ? jobNodes : location.pathname === "/filter" ? fetchedPosts : []}
          setCurrentPosts={setCurrentJobPosts}
          isHidden={!showJobFilters}
        />
      </section>
      <div className="Home__toggleJobsWrap">
        <h1 style={{ textAlign: "center" }}>Job Posts:</h1>
        <section className="Home__viewWrap">
          <ToggleJobs
            currentContextPosts={location.pathname === "/" ? jobNodes : location.pathname === "/filter" ? fetchedPosts : []}
            setCurrentPosts={setCurrentJobPosts}
          />
          <ViewJobs jobPosts={currentJobPosts} loading={searching || searchingByTag} message={message} handleTagClick={tagClickHandler} />
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GET_POST_DATA_FOR_CARDS {
    allMongodbEngineJobs(sort: { fields: created, order: DESC }) {
      nodes {
        addOns {
          highlight
          showLogo
          stickyMonth
          stickyWeek
          customHighlight
        }
        created
        jobId
        featuredImage
        employmentType {
          label
          value
        }
        hiringInfo {
          recruiter
          website
          type
          slug
        }
        category {
          label
          value
        }
        tags
        location
        title
      }
    }
  }
`;

export default IndexPage;
