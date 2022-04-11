//Components
import Checkbox from "@Components/Inputs/Checkbox/Checkbox";
import Form from "@Components/composed/Form/Form";
//Misc
import categories from "@Shared/utils/categories";
import empTypes from "@Shared/utils/employment-types";
import PropTypes from "prop-types";
import React, { useState } from "react";

import * as styles from "./JobFilters.module.scss";

const filterMap = {};
//responsible for filtering current posts in context
//filters by cateogry, employment type, or both
const JobFilters = ({ currentContextPosts, setCurrentPosts, isHidden }) => {
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeEmpTypes, setActiveEmpTypes] = useState([]);

  const filterHandler = (e) => {
    e.preventDefault();
    //create a hash table with all the filter values under a key set to true
    if (activeCategories.length > 0) {
      activeCategories.forEach((cat) => (filterMap[cat] = true));
    }
    if (activeEmpTypes.length > 0) {
      activeEmpTypes.forEach((empType) => (filterMap[empType] = true));
    }

    //Trigger if at least a either a job category or employment type is selected
    if (Object.keys(filterMap).length > 0) {
      //always filter current jobPosts
      const filteredPosts = currentContextPosts.filter((post) => {
        //if both category and emptype filters are active, then post must match both
        if (activeCategories.length > 0 && activeEmpTypes.length > 0) {
          return filterMap[post.category.id] && filterMap[post.employmentType.id];
        }
        //job category filter is active
        //check if current post's category slug can be used as a key in our filterMap, indicating it is a match
        if (activeCategories.length > 0) {
          return !!filterMap[post.category.id];
        }
        //employment type is active
        //check if current post's employment type slug can be used as a key in our filterMap, indicating it is a match
        if (activeEmpTypes.length > 0) {
          return !!filterMap[post.employmentType.id];
        }
        return false;
      });
      setCurrentPosts(filteredPosts);
    } else {
      setCurrentPosts(currentContextPosts);
    }
  };

  return (
    <Form
      onSubmit={filterHandler}
      classes={{
        root: `${styles.JobFilters} ${!isHidden ? styles._show : ""}`,
        button: styles.JobFilters__filterButton,
      }}
      submitText="Filter Jobs"
      showStatusUi={false}
    >
      <Checkbox
        classes={{
          root: styles.JobFilters__categories,
          inputWrap: styles.JobFilters__categoriesLi,
          input: styles.JobFilters__categoriesInput,
        }}
        options={categories}
        keyboardFocusOnly
        heading="Category"
        hiddenLabel
        value={activeCategories}
        stateHandler={(newVal) => setActiveCategories(newVal)}
        renderBeforeInput={(option) => <img className={styles.JobFilters__categoriesImage} src={option.src} alt={`Icon of ${option.label}`} />}
      />
      <Checkbox
        classes={{
          inputWrap: styles.JobFilters__empTypesLi,
        }}
        heading="Employment Types"
        hiddenLabel
        options={empTypes}
        value={activeEmpTypes}
        stateHandler={(newVal) => setActiveEmpTypes(newVal)}
      />
    </Form>
  );
};

JobFilters.propTypes = {
  isHidden: PropTypes.bool,
  currentContextPosts: PropTypes.array.isRequired,
  setCurrentPosts: PropTypes.func.isRequired,
};

export default JobFilters;
