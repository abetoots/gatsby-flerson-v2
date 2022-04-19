import SEO from "@Components/seo";
import PostJobForms from "@Core/PostJobForms/PostJobForms";
//Components
import Preview from "@Core/PostJobForms/Preview/Preview";
//Misc
import { Router } from "@reach/router";
//Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useMemo, createContext } from "react";
import { defaultValues as jobInfoDefaultValues } from "@Core/PostJobForms/JobInfo/form-config";

import { defaultValues as paymentDefaultValues } from "@Core/PostJobForms/Payment/form-config";
import { useForm, FormProvider } from "react-hook-form";

// Import the Slate editor factory.
import { createEditor } from "slate";
// Import the Slate components and React plugin.
import { withReact } from "slate-react";

export const EditorsContext = createContext();

//Add Stripe.js and Elements to your page
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

const PostJob = (props) => {
  //STATE
  const formMethods = useForm({ mode: "onChange", reValidateMode: "onChange", defaultValues: { ...jobInfoDefaultValues, ...paymentDefaultValues } });

  // Create a Slate editor object that won't change across renders.
  const jobDescEditor = useMemo(() => withReact(createEditor()), []);
  const howToApplyEditor = useMemo(() => withReact(createEditor()), []);
  //Cleanup editor state only once
  useEffect(() => {
    //Cleanup editor state on browser unload
    window.addEventListener("unload", () => {
      localStorage.removeItem("job_description");
      localStorage.removeItem("how_to_apply");
    });
    return function cleanup() {
      localStorage.removeItem("job_description");
      localStorage.removeItem("how_to_apply");
    };
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <SEO title="Post a Job" />
      <EditorsContext.Provider
        value={{
          jobDescEditor: jobDescEditor,
          howToApplyEditor: howToApplyEditor,
        }}
      >
        <FormProvider {...formMethods}>
          <Router basepath="/post-job">
            <Preview path="/preview" />
            <PostJobForms path="/" />
          </Router>
        </FormProvider>
      </EditorsContext.Provider>
    </Elements>
  );
};

export default PostJob;
