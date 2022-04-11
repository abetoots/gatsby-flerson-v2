//Components
import Button from "@Components/Button/Button";
import FullJob from "@Components/FullJob/FullJob";
import { serialize } from "@Components/RichEditor/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorsContext } from "@Index/pages/post-job";
import {
  ADD_ONS,
  EMPLOYER_LOGO,
  EMPLOYER_NAME,
  EMPLOYMENT_TYPE,
  EXTRA_TAGS,
  LOCATION,
  POSITION,
  PRIMARY_TAG,
  SALARY,
  SALARY_MAX,
  SALARY_TYPE,
  VALUE_HOUR,
  VALUE_MONTH,
  VALUE_YEAR,
} from "@Shared/utils/constants";
//Misc
import { navigate } from "gatsby";
import parse from "html-react-parser";
import startCase from "lodash.startcase";
import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "@reach/router";

import * as styles from "./Preview.module.scss";

const Preview = () => {
  const { jobDescEditor, howToApplyEditor } = useContext(EditorsContext);
  const location = useLocation();

  const { getValues } = useFormContext();

  const formValues = getValues();
  console.log("fv", formValues);
  if (location.pathname !== "/post-job/preview") {
    navigate("/post-job");
    return null;
  }

  let salaryType;
  switch (formValues[SALARY_TYPE]) {
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

  const tagClickHandler = () => {
    return;
  };

  const buttonClickHandler = (e) => {
    navigate("/post-job");
  };

  return (
    <div>
      <div className={styles.Preview__header}>
        <Button onClick={buttonClickHandler} classes={{ root: styles.Preview__backButton }}>
          <FontAwesomeIcon icon="chevron-left" />
          <div>BACK</div>
        </Button>
        <h1>
          Preview
          <span role="img" aria-label="emoji of film projector">
            📽️
          </span>
        </h1>
      </div>
      <FullJob
        addOns={formValues[ADD_ONS]}
        applyUrl=""
        employerName={formValues[EMPLOYER_NAME]}
        employmentType={startCase(formValues[EMPLOYMENT_TYPE].value.replace("-", " "))}
        handleTagClick={tagClickHandler}
        renderImage={(noImage) => {
          if (formValues[EMPLOYER_LOGO][0]) {
            return <Preview url={formValues[EMPLOYER_LOGO][0].url} />;
          } else {
            return noImage;
          }
        }}
        jobPosition={formValues[POSITION]}
        location={formValues[LOCATION]}
        primaryTag={formValues[PRIMARY_TAG].value.replace("-", " ")}
        salary={formValues[SALARY_MAX] ? `${formValues[SALARY]} - ${formValues[SALARY_MAX]}` : formValues[SALARY]}
        salaryType={salaryType}
        description={parse(serialize(jobDescEditor))}
        howToApply={parse(serialize(howToApplyEditor))}
        tags={formValues[EXTRA_TAGS] ? formValues[EXTRA_TAGS].split(",") : []}
      />
    </div>
  );
};

export default Preview;
