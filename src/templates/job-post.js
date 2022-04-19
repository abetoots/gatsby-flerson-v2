//Components
import FullJob from "@Components/FullJob/FullJob";
import Layout from "@Components/layout";
import SEO from "@Components/seo";
import {
  ADD_ONS,
  DESCRIPTION,
  EMPLOYER_LOGO,
  EMPLOYER_NAME,
  EMPLOYMENT_TYPE,
  EXTRA_TAGS,
  LOCATION,
  POSITION,
  CATEGORY,
  SALARY,
  SALARY_MAX,
  VALUE_HOUR,
  VALUE_MONTH,
  VALUE_YEAR,
  APPLY_URL,
  APPLY_EMAIL,
  SALARY_TYPE,
  EMPLOYER_WEBSITE,
  VALID_UNTIL,
  HOW_TO_APPLY,
} from "@Shared/utils/constants";
import ImagePreview from "@Components/composed/Upload/Preview/Preview";
import { graphql, navigate } from "gatsby";
//Misc
import parse from "html-react-parser";
import React from "react";

const JobPost = ({ data }) => {
  const postData = data.mongodbEngineJobs;

  console.log(postData);

  const description = postData[DESCRIPTION] ? parse(postData[DESCRIPTION]) : "";
  const howToApply = postData[HOW_TO_APPLY] ? parse(postData[HOW_TO_APPLY]) : "";

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
    isPrimary ? navigate(`/filter?category=${tag}`) : navigate(`/filter?tag=${tag}`);
  };

  return (
    <Layout mainStyle={{ backgroundColor: "#e2e8f0", padding: "1.5rem 0" }}>
      <SEO title={`${postData.hiringInfo[EMPLOYER_NAME]} - ${postData[POSITION]} | Flerson`}>
        <script type="application/ld+json">{`
        {
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": "${postData[POSITION]}",
            "description": "${postData[DESCRIPTION]}",
            "identifier": {
                "@type": "PropertyValue",
                "name": "${postData.hiringInfo[EMPLOYER_NAME]}",
                "value": "${postData.jobId}"
            },
            "datePosted": "${postData.created}",
            "validThrough": "${postData[VALID_UNTIL]}",
            "applicantLocationRequirements": {
                "@type": "Country",
                "name": "${postData[LOCATION].toUpperCase()}"
            },
            "jobLocationType": "TELECOMMUTE",
            "employmentType": "${postData[EMPLOYMENT_TYPE].label}",
            "hiringOrganization": {
                "@type": "Organization",
                "name": "${postData.hiringInfo[EMPLOYER_NAME]}",
                "sameAs": "${postData.hiringInfo[EMPLOYER_WEBSITE] || ""}",
                "logo": "${postData[EMPLOYER_LOGO] ? postData[EMPLOYER_LOGO] : ""}"
            },
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": {
                    "@type": "QuantitativeValue",
                    ${
                      postData[SALARY_MAX]
                        ? `
                        "minValue": ${postData[SALARY]},
                        "maxValue": ${postData[SALARY_MAX]}
                        `
                        : `"value": ${postData[SALARY]}`
                    }
                    "unitText": "${postData[SALARY_TYPE]}"
                }
            }
        }`}</script>
      </SEO>
      <FullJob
        addOns={postData[ADD_ONS]}
        applyUrl={postData[APPLY_URL] ? postData[APPLY_URL] : postData[APPLY_EMAIL]}
        employerName={postData.hiringInfo[EMPLOYER_NAME]}
        employmentType={postData[EMPLOYMENT_TYPE].label}
        handleTagClick={tagClickHandler}
        renderImage={(noImage) => {
          if (postData[EMPLOYER_LOGO]) {
            return <ImagePreview url={postData[EMPLOYER_LOGO]} />;
          } else {
            return noImage;
          }
        }}
        jobPosition={postData[POSITION]}
        location={postData[LOCATION]}
        primaryTag={postData[CATEGORY].value.replace("-", " ")}
        salary={postData[SALARY_MAX] ? `${postData[SALARY]} - ${postData[SALARY_MAX]}` : postData[SALARY]}
        salaryType={salaryType}
        description={description}
        howToApply={howToApply}
        tags={postData[EXTRA_TAGS] ? postData[EXTRA_TAGS].split(",") : []}
      />
    </Layout>
  );
};

//variable $id is passed down as context from createPage. see gatsby-node.js
export const query = graphql`
  query FULL_JOB_POST($id: String!) {
    mongodbEngineJobs(jobId: { eq: $id }) {
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
      }
      category {
        label
        value
      }
      tags
      location
      title
      salary
      salaryMax
      salaryType
      contentMain
      contentHow
    }
  }
`;

export default JobPost;
