import React, { useState, useEffect } from "react";
import "./index.scss";

//Components
import Button from "@Components/bits/Button/Button";
import JobFilters from "@Core/JobFilters/JobFilters";
import ViewJobs from "@Core/ViewJobs/ViewJobs";
import Search from "@Components/bits/Search/Search";
import SEO from "@Components/seo";
import Layout from "@Components/layout";
import ToggleJobs from "@Core/ToggleJobs/ToggleJobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Misc
import { graphql, navigate } from "gatsby";
import { searchIcon3 } from "@Images/search-icons";

//Request
import GET_JOB_POSTS_BY_SEARCH from "./get-jobs-by-search.graphql";
import GET_JOB_POSTS_BY_TAG from "./get-jobs-by-tag.graphql";
import { useLazyQuery } from "@apollo/react-hooks";

const IndexPage = ({ data, location }) => {
  //SETUP
  //create a hash table with key-value pairs of jobId = indexInNodesArray
  const jobIndex = {};
  data.allWpJobPost.nodes.forEach((node, arrayIndex) => {
    jobIndex[node.id] = arrayIndex;
  });
  const jobNodes = data.allWpJobPost.nodes;
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
  const [fetchedPosts, setFetchedPosts] = useState([]);

  const [searchState, setSearchState] = useState("");
  const [showJobFilters, setShowJobFilters] = useState(false);
  const [activeTag, setActiveTag] = useState("");

  //EFFECTS
  const [search, { loading: searching, data: searchData }] = useLazyQuery(
    GET_JOB_POSTS_BY_SEARCH
  );
  const [
    searchByTag,
    { loading: searchingByTag, data: searchByTagData },
  ] = useLazyQuery(GET_JOB_POSTS_BY_TAG);

  useEffect(() => {
    //when current location is at '/filter', it means we want to query for data
    if (location.pathname === "/filter") {
      const params = new URLSearchParams(location.search);
      //if props.location has search query param , fire the search
      if (params.has("search")) {
        search({
          variables: {
            query: params.get("search"),
          },
        });
      }

      //if props.location has a tag query param , fire the tag search
      if (params.has("tag")) {
        searchByTag({
          variables: {
            tag: params.get("tag"),
            fieldType: "NAME",
            taxonomy: "JOBTAG",
          },
        });
        setActiveTag(params.get("tag"));
      }

      if (params.has("category")) {
        searchByTag({
          variables: {
            tag: params.get("category"),
            fieldType: "NAME",
            taxonomy: "JOBCATEGORY",
          },
        });
        setActiveTag(params.get("category"));
      }
    }
  }, [location.pathname, location.search, search, searchByTag]);

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
    isPrimary
      ? navigate(`/filter?category=${tag}`)
      : navigate(`/filter?tag=${tag}`);
  };

  let message;
  if (currentJobPosts.length === 0) {
    message = "No job posts found";
  } else if (activeTag) {
    message = `Job posts tagged "${activeTag}"`;
  }

  return (
    <Layout>
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
          originalPosts={
            location.pathname === "/"
              ? jobNodes
              : location.pathname === "/filter"
              ? fetchedPosts
              : []
          }
          setCurrentPosts={setCurrentJobPosts}
          isHidden={!showJobFilters}
        />
      </section>
      <h1 style={{ textAlign: "center" }}>Job Posts:</h1>
      <section className="Home__viewWrap">
        <ToggleJobs
          originalPosts={
            location.pathname === "/"
              ? jobNodes
              : location.pathname === "/filter"
              ? fetchedPosts
              : []
          }
          setCurrentPosts={setCurrentJobPosts}
        />
        <ViewJobs
          jobPosts={currentJobPosts}
          loading={searching || searchingByTag}
          message={message}
          handleTagClick={tagClickHandler}
        />
      </section>
    </Layout>
  );
};

export const query = graphql`
  query GET_POST_DATA_FOR_CARDS {
    allWpJobPost(sort: { order: DESC, fields: date }) {
      nodes {
        addOns {
          highlight
          showLogo
          stickyMonth
          stickyWeek
          customHighlight {
            hex
          }
        }
        author {
          node {
            slug
          }
        }
        content
        databaseId
        date
        employmentTypes {
          nodes {
            name
            slug
          }
        }
        id
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        hiringInfo {
          name
          website
          isCompany
        }
        jobCategories {
          nodes {
            name
            slug
          }
        }
        jobTags {
          nodes {
            name
            slug
          }
        }
        location
        title
      }
    }
  }
`;

export default IndexPage;
