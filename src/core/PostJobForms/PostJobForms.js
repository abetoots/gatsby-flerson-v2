import "./PostJobForms.scss";

import Status from "@Components/composed/Form/UI/Status";
//Components
import JobCard from "@Components/JobCard/JobCard";
import Layout from "@Components/layout";
//Misc
import { serialize } from "@Components/RichEditor/utils";

import JobInfoInputs from "@Core/PostJobForms/JobInfo/JobInfo";
import { ADDON_PRICES } from "@Core/PostJobForms/Payment/form-config";
import PaymentInputs from "@Core/PostJobForms/Payment/Payment";
import * as constants from "@Shared/utils/constants";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";

import Form, { FormSubmitButton } from "@Components/composed/Form/Form";

import Preview from "@Components/composed/Upload/Preview/Preview";
import { EditorsContext } from "@Index/pages/post-job";
import { useFormContext } from "react-hook-form";
import axios from "axios";

const DEFAULT_PRICE = 20;

const PostJobForms = (props) => {
  const { getValues, watch, handleSubmit } = useFormContext();

  const [brandColor, setBrandColor] = useState({ hex: "#ffffff" });

  //LOCAL STATE
  const [pending, setPending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [jobPrice, setJobPrice] = useState(DEFAULT_PRICE);

  const { jobDescEditor, howToApplyEditor } = useContext(EditorsContext);

  //watch was made for the render phase, not useEffect
  const formValues = watch();

  console.log("fv", formValues);

  //@Watch: no way to watch and trigger imperative operations at the moment
  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (name === constants.ADD_ONS) {
        if (values[constants.ADD_ONS]?.length > 0) {
          let addonCost = 0;
          for (let val of values[constants.ADD_ONS]) {
            addonCost = addonCost + ADDON_PRICES[val];
          }
          setJobPrice(DEFAULT_PRICE + addonCost);
        } else {
          setJobPrice(DEFAULT_PRICE);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  //REF
  //   const jobInfoRef = useRef(null);

  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  //HANDLERS
  const postJobFormsFormHandler = async (formData) => {
    // //Manually trigger the job info form validation UI
    // const isValid = jobInfoRef.current.reportValidity();
    // if (!isValid) {
    //   return;
    // }

    console.log("formData", formData);

    //Additional validation for the Job Info form
    if (!formData[constants.APPLY_URL] && !formData[constants.APPLY_EMAIL]) {
      setFormError("Please set at least a URL or email to apply to");
      return;
    }
    if (formData[constants.APPLY_URL] && formData[constants.APPLY_EMAIL]) {
      setFormError("You can't select both");
      return;
    }
    if (serialize(jobDescEditor) === "") {
      setFormError("Please provide a job description");
      return;
    }

    // Additional validation for the Payment form
    if (formData[constants.ADD_ONS].includes(constants.SHOW_LOGO) && !formData[constants.EMPLOYER_LOGO][0]?.file) {
      setFormError("Show logo addon is checked. Please choose a company logo");
      return;
    }

    if (formData[constants.ADD_ONS].includes(constants.CUSTOM_HIGHLIGHT)) {
      formData[constants.BRAND_COLOR] = brandColor.hex;
    }
    //Add serialized slate editor contents
    formData[constants.DESCRIPTION] = serialize(jobDescEditor);
    formData[constants.HOW_TO_APPLY] = serialize(howToApplyEditor);

    setPending(true);
    try {
      const { data: postData } = await axios.post(process.env.GATSBY_API_URL, formData);

      console.log("[postJobFormsFormHandler]: post job done!", postData);

      setFormSuccess(true);
    } catch (err) {
      setFormError("Unexpected error occured. This is on our side and we apologize");
      console.log("[postJobFormsFormHandler]: exceptional error!", err?.response?.data);
    }

    setPending(false);
  };

  useEffect(() => {
    if (formError || formSuccess) {
      setShowStatus(true);
      setTimeout(() => {
        setShowStatus(false);
      }, 3000);
      setTimeout(() => {
        setFormError("");
        setFormSuccess(false);
      }, 5000);
    }
  }, [formSuccess, formError]);

  let statusClass = "PostJobForms__status";
  if (showStatus) {
    statusClass = `${statusClass} _animate`;
  }

  let statusMessage = "";
  if (formError) {
    statusClass = `${statusClass} _error`;
    statusMessage = (
      <>
        {formError}
        <span role="img" aria-label="error">
          ❌
        </span>
      </>
    );
  }
  //TODO give user link to navigate to job posted
  if (formSuccess) {
    statusClass = `${statusClass} _success`;
    statusMessage = (
      <>
        Success!
        <span role="img" aria-label="success">
          ✅
        </span>{" "}
        <span style={{ color: "black" }}>Your job has been posted</span>
      </>
    );
  }

  return (
    <Layout mainStyle={{ backgroundColor: "#e2e8f0", padding: "1.5rem 0" }}>
      <Status classes={{ root: statusClass }} error={formError} success={formSuccess}>
        {statusMessage}
      </Status>

      <Form loading={props.loading} onSubmit={handleSubmit(postJobFormsFormHandler)} submitButton={null}>
        <div className="PostJobForms">
          <section className="PostJobForms__slot _1">
            <JobInfoInputs />
          </section>
          <section className="PostJobForms__slot _2">
            <PaymentInputs loading={pending} brandColor={brandColor} setBrandColor={setBrandColor} />
            <div>
              <h2 className="PostJobForms__heading">Job Card Preview</h2>
              <JobCard
                isPreview
                customHighlight={!!brandColor.hex ? brandColor.hex : formValues[constants.ADD_ONS].includes(constants.NORMAL_HIGHLIGHT)}
                employerName={formValues[constants.EMPLOYER_NAME]}
                employerWebsite={formValues[constants.EMPLOYER_WEBSITE]}
                renderImage={(noImage) => {
                  if (formValues[constants.EMPLOYER_LOGO][0]?.url) {
                    return <Preview url={formValues[constants.EMPLOYER_LOGO][0].url} />;
                  } else {
                    return noImage;
                  }
                }}
                jobUrl="/post-job/preview"
                jobPosition={formValues[constants.POSITION]}
                location={formValues[constants.LOCATION]}
                handleTagClick={() => null}
                primaryTag={formValues[constants.CATEGORY].value}
                showImage={formValues[constants.ADD_ONS].includes(constants.SHOW_LOGO)}
                tags={formValues[constants.EXTRA_TAGS] && formValues[constants.EXTRA_TAGS].split(", ")}
              />
            </div>
            <div>
              <FormSubmitButton classes={{ root: "PostJobForms__submitBtn" }} submitText={`Post your job for $${jobPrice}`} />
            </div>
          </section>
        </div>
      </Form>
    </Layout>
  );
};

PostJobForms.propTypes = {
  jobInfoStateVariable: PropTypes.array.isRequired,
  paymentStateVariable: PropTypes.array.isRequired,
};

export default PostJobForms;
