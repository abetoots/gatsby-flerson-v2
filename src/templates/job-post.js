import React from "react";

//Components
import FullJob from "@Components/FullJob/FullJob";
import SEO from "@Components/seo";
import Layout from "@Components/layout";

//Misc
import parse from "html-react-parser";
import { graphql, navigate } from "gatsby";

import { VALUE_HOUR, VALUE_MONTH, VALUE_YEAR } from "@Shared/utils/constants";

const JobPost = (props) => {
  const postData = props.data.wpJobPost;

  console.log(postData);

  const description = postData.content ? parse(postData.content) : "";
  const howToApply = postData.howToApply ? parse(postData.howToApply) : "";

  let salaryType;
  switch (postData.salaryType) {
    case VALUE_HOUR:
      salaryType = "Hourly";
      break;
    case VALUE_MONTH:
      salaryType = "Monthly";
      break;
    case VALUE_YEAR:
      salaryType = "Annual";
      break;
    default:
      salaryType = "Not provided";
  }

  const tagClickHandler = (e, tag, isPrimary) => {
    e.stopPropagation(); //prevent parent's click handler
    isPrimary
      ? navigate(`/filter?category=${tag}`)
      : navigate(`/filter?tag=${tag}`);
  };

  return (
    <Layout mainStyle={{ marginBottom: "2rem" }}>
      <SEO title={`${postData.hiringInfo.name} - ${postData.title} | Flerson`}>
        <script type="application/ld+json">{`
        {
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": "${postData.title}",
            "description": "${postData.content}",
            "identifier": {
                "@type": "PropertyValue",
                "name": "${postData.hiringInfo.name}",
                "value": "${postData.databaseId}"
            },
            "datePosted": "${postData.date}",
            "validThrough": "${postData.validUntil}",
            "applicantLocationRequirements": {
                "@type": "Country",
                "name": "${postData.location.toUpperCase() || "WORLDWIDE"}"
            },
            "jobLocationType": "TELECOMMUTE",
            "employmentType": "${postData.employmentTypes.nodes[0].name}",
            "hiringOrganization": {
                "@type": "Organization",
                "name": "${postData.hiringInfo.name}",
                "sameAs": "${postData.hiringInfo.website || ""}",
                "logo": "${
                  postData.featuredImage
                    ? postData.featuredImage.localFile.node.childImageSharp
                        .fluid.src
                    : ""
                }"
            },
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": {
                    "@type": "QuantitativeValue",
                    ${
                      postData.salaryMax
                        ? `
                        "minValue": ${postData.salary},
                        "maxValue": ${postData.salaryMax}
                        `
                        : `"value": ${postData.salary}`
                    }
                    "unitText": "${postData.salaryType}"
                }
            }
        }`}</script>
      </SEO>
      <FullJob
        addOns={postData.addOns}
        image={
          postData.featuredImage
            ? {
                fluid:
                  postData.featuredImage.node.localFile.childImageSharp.fluid,
              }
            : null
        }
        employerUrl={postData.hiringInfo.website || null}
        description={description}
        handleTagClick={tagClickHandler}
        howToApply={howToApply}
        location={postData.location || ""}
        salary={
          postData.salaryMax
            ? `${postData.salary} - ${postData.salaryMax}`
            : `${postData.salary}`
        }
        salaryType={salaryType}
        tags={postData.jobTags.nodes.map((tag) => tag.name)}
        //Always checked by our backend. No need for fallbacks
        applyUrl={postData.applyUrl}
        employerName={postData.hiringInfo.name || ""}
        employmentType={postData.employmentTypes.nodes[0].name}
        jobPosition={postData.title}
        primaryTag={postData.jobCategories.nodes[0].name}
      />
    </Layout>
  );
};

export const query = graphql`
  query FULL_JOB_POST($id: String!) {
    wpJobPost(id: { eq: $id }) {
      addOns {
        highlight
        showLogo
        stickyMonth
        stickyWeek
        customHighlight {
          hex
        }
      }
      applyUrl
      content
      date
      databaseId
      employmentTypes {
        nodes {
          name
          slug
        }
      }
      hiringInfo {
        name
        website
        isCompany
      }
      howToApply
      jobCategories {
        nodes {
          name
          slug
        }
      }
      jobTags {
        nodes {
          slug
          name
        }
      }
      location
      salary
      salaryMax
      salaryType
      title
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_noBase64
                src
              }
            }
          }
        }
      }
      validUntil
    }
  }
`;

export default JobPost;
