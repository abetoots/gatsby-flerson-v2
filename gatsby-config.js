const path = require("path");
const tailwindcss = require("tailwindcss");
const tailwindNesting = require("tailwindcss/nesting");
const postcssImport = require("postcss-import");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log("process", process.env);

module.exports = {
  siteMetadata: {
    title: `Remote Job Board | Flerson`,
    description: `A super simple job board platform for finding/posting remote jobs. 
      Employers/Recruiters click "Post Job". Jobseekers click "Apply". That's all that happens here.`,
    author: "Abe Suni M.Caymo",
    twitterUsername: "@abetoots",
    siteUrl: "https://flerson.com",
  },
  plugins: [
    //Support SASS. Define 'global' sass files
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [postcssImport(), tailwindNesting(), tailwindcss()],
        sassOptions: {
          includePaths: [
            path.resolve(__dirname, "src/sass/util/_variables.scss"),
            path.resolve(__dirname, "src/sass/tools/_functions.scss"),
            path.resolve(__dirname, "src/sass/tools/_mixins.scss"),
          ],
        },
        //only variables and mixins to avoid duplicating
        additionalData: `
            @use "./src/sass/util/variables" as *;
            @use "./src/sass/tools/functions" as *;
            @use "./src/sass/tools/mixins" as *;
            `,
      },
    },
    //Add typography.js
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/shared/utils/typography`,
        omitGoogleFont: true,
      },
    },
    //Add support for webpack-aliases
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@Images": path.resolve(__dirname, "src/images/"),
          "@Components": path.resolve(__dirname, "src/components/"),
          "@Core": path.resolve(__dirname, "src/core/"),
          "@Hoc": path.resolve(__dirname, "src/components/hoc/"),
          "@Index": path.resolve(__dirname, "src/"),
          "@Shared": path.resolve(__dirname, "src/shared/"),
        },
      },
    },
    //Use SVGs as components
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
    "gatsby-plugin-netlify",
    "gatsby-plugin-graphql-loader",
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `engine`,
        collection: [`jobs`],
        server: {
          address: "cluster0-shard-00-01.lmx4n.mongodb.net",
          port: 27017,
        },
        auth: {
          user: process.env.MONGODB_USERNAME,
          password: process.env.MONGODB_PASS,
        },
        extraParams: {
          replicaSet: "atlas-m3njxt-shard-0",
          authSource: "admin",
          ssl: true,
          retryWrites: true,
          w: "majority",
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-125033716-3",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Flerson Remote Job Board`,
        short_name: `flerson`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#F7901E`,
        display: `minimal-ui`,
        icon: `src/images/flerson-icon.png`, // This path must be relative to the root URL of the site, not your project.
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
