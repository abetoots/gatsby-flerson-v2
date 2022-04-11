import { InputGroupConfig } from "@Index/shared/utils/types";
import categories from "@Shared/utils/categories";
import {
  APPLY_EMAIL,
  APPLY_URL,
  EMPLOYER_LOGO,
  EMPLOYER_NAME,
  EMPLOYER_TYPE,
  EMPLOYER_WEBSITE,
  EMPLOYMENT_TYPE,
  EXTRA_TAGS,
  LOCATION,
  POSITION,
  PRIMARY_TAG,
  SALARY,
  SALARY_MAX,
  SALARY_TYPE,
  VALUE_COMPANY,
  VALUE_HOUR,
  VALUE_MONTH,
  VALUE_SINGLE_CLIENT,
  VALUE_YEAR,
} from "@Shared/utils/constants";
import empTypes from "@Shared/utils/employment-types";

export const jobInfoInputs: InputGroupConfig[] = [
  {
    key: POSITION,
    description: `Please specify a single job position like "Marketing Manager" or "Vue Developer" .
    Do not provide a sentence like " *** HIRING NOW!! Looking for VA / WP Expert / SEO Expert!! *** ". This is not recommended
    and Google might consider this as "spammy". If posting multiple roles, please create multiple job posts. A job post is limited to a single job. 
    `,
    elType: "input",
    elementConfig: {
      heading: "Position",
      type: "text",
    },
    validation: {
      required: true,
    },
    initialValue: "",
  },
  {
    key: LOCATION,
    description: `Location this remote job is restricted to (e.g. Europe, United States, or Amsterdam). If not restricted, leave it as "Worldwide". 
    The less restricted this is, the more applicants you will get.`,
    elType: "input",
    elementConfig: {
      heading: "Location",
      type: "text",
    },
    validation: {
      required: true,
    },
    initialValue: "Worldwide",
  },
  {
    key: PRIMARY_TAG,
    description: "Choose a primary category associated with a filter in the home page",
    elType: "select",
    elementConfig: {
      heading: "Primary Category",
      options: categories,
      valueAccessor: "value",
      labelAccessor: "label",
    },
    initialValue: categories[0],
  },
  {
    key: EXTRA_TAGS,
    description: `Separate by comma. Use words related to the job position and the primary category.`,
    elType: "input",
    elementConfig: {
      heading: "Extra tags",
      type: "text",
      placeholder: "e.g. startup, analytics, svelte, seo, social media,",
    },
    initialValue: "",
  },
  {
    key: EMPLOYMENT_TYPE,
    elType: "select",
    elementConfig: {
      heading: "Employment Type",
      options: empTypes,
    },
    initialValue: empTypes[0],
  },
  {
    key: SALARY,
    description: "Provide the the actual base salary",
    elType: "input",
    elementConfig: {
      heading: "Salary",
      type: "number",
    },
    validation: {
      required: true,
    },
    initialValue: "",
  },
  {
    key: SALARY_MAX,
    description: "Useful if you want to provide a max salary range",
    elType: "input",
    elementConfig: {
      heading: "Salary Max Range (Optional)",
      type: "number",
    },
    initialValue: "",
  },
  {
    key: SALARY_TYPE,
    description: "An ANNUAL base salary is recommended",
    elType: "select",
    elementConfig: {
      heading: "Salary Type",
      options: [
        {
          value: VALUE_HOUR,
          label: "Hourly",
        },
        {
          value: VALUE_MONTH,
          label: "Monthly",
        },
        {
          value: VALUE_YEAR,
          label: "Annual",
        },
      ],
    },
    initialValue: {
      value: VALUE_YEAR,
      label: "Annual",
    },
  },
];

export const applyInputs: InputGroupConfig[] = [
  {
    key: APPLY_URL,
    description: "Where should people go to apply for this job?",
    elType: "input",
    elementConfig: {
      heading: "Apply URL",
      type: "url",
    },
    initialValue: "",
    removedBy: APPLY_EMAIL,
  },
  {
    key: APPLY_EMAIL,
    description: "An alternative if you can't supply an Apply URL",
    elType: "input",
    elementConfig: {
      heading: "Apply Email (Public)",
      type: "email",
    },
    initialValue: "",
    removedBy: APPLY_URL,
  },
];

export const uploadInput: InputGroupConfig = {
  key: EMPLOYER_LOGO,
  description: "Max Upload Size: 5 MB. Recommended: 512 x 512",
  elType: "file",
  elementConfig: {
    heading: "Employer Logo",
    type: "file",
    accept: "image/jpeg, image/png",
    maxMb: 5,
    allowMultiple: false,
  },
  initialValue: [],
};

export const companyInfoInputs: InputGroupConfig[] = [
  {
    key: EMPLOYER_NAME,
    elType: "input",
    elementConfig: {
      heading: "Employer Name",
      type: "text",
    },
    validation: {
      required: true,
    },
    initialValue: "",
  },
  {
    key: EMPLOYER_WEBSITE,
    elType: "input",
    elementConfig: {
      heading: "Employer Website",
      type: "url",
    },
    initialValue: "",
  },
  {
    key: EMPLOYER_TYPE,
    description: "Do you represent a company or a single employer? This is to help other jobseekers who prefer working with single clients",
    elType: "select",
    elementConfig: {
      heading: "Employer Type",
      options: [
        {
          value: VALUE_SINGLE_CLIENT,
          label: "Single Client",
        },
        {
          value: VALUE_COMPANY,
          label: "Company",
        },
      ],
    },
    initialValue: {
      value: VALUE_COMPANY,
      label: "Company",
    },
  },
];

const inputGroup = jobInfoInputs.concat(companyInfoInputs, applyInputs, [uploadInput]);
export const defaultValues: any = {};
inputGroup.forEach((input) => (defaultValues[input.key] = input.initialValue));

export default inputGroup;
