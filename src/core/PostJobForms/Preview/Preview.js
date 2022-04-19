//Components
import Button from "@Components/Button/Button";
import FullJob from "@Components/FullJob/FullJob";
import ImagePreview from "@Components/composed/Upload/Preview/Preview";
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
  CATEGORY,
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
import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "@reach/router";

import * as styles from "./Preview.module.scss";

const Preview = () => {
  const { jobDescEditor, howToApplyEditor } = useContext(EditorsContext);
  const location = useLocation();

  const { getValues } = useFormContext();

  const formValues = getValues();

  useEffect(() => {
    if (location.pathname !== "/post-job/preview") {
      navigate("/post-job");
      return null;
    }
  }, [location.pathname]);

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
    <div className={styles.Preview}>
      <div className={styles.Preview__header}>
        <Button onClick={() => buttonClickHandler()} classes={{ root: styles.Preview__backButton }}>
          <FontAwesomeIcon icon="chevron-left" />
          <div>BACK</div>
        </Button>
        <h1 style={{ margin: 0 }}>Preview</h1>
      </div>
      <FullJob
        addOns={formValues[ADD_ONS]}
        applyUrl=""
        employerName={formValues[EMPLOYER_NAME]}
        employmentType={formValues[EMPLOYMENT_TYPE].label}
        handleTagClick={() => {}}
        renderImage={(noImage) => {
          if (formValues[EMPLOYER_LOGO][0]) {
            return <ImagePreview url={formValues[EMPLOYER_LOGO][0].url} />;
          } else {
            return noImage;
          }
        }}
        jobPosition={formValues[POSITION]}
        location={formValues[LOCATION]}
        primaryTag={formValues[CATEGORY].value.replace("-", " ")}
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
