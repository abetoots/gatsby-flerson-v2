/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/post-job/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/post-job/*";
    // Update the page.
    createPage(page);
  }
};

//Create pages for each job post
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  createPage({
    path: "/filter",
    component: path.resolve(__dirname, "src/pages/index.js"),
  });

  const jobPostTemplate = path.resolve(__dirname, "src/templates/job-post.js");

  const result = await graphql(/* GraphQL */ `
    query GET_JOB_POST_NODES {
      allMongodbEngineJobs {
        nodes {
          jobId
          hiringInfo {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMongodbEngineJobs.nodes.forEach((post) => {
    createPage({
      component: jobPostTemplate,
      path: `/${post.hiringInfo.slug}/${post.jobId}`, //ex: flerson/88
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: post.jobId,
      },
    });
  });
};

const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
