import React, { createContext, useMemo, useEffect } from "react";

//Components
import Preview from "@Core/PostJobForms/Preview/Preview";
import Forms from "@Core/PostJobForms/PostJobForms";
import SEO from "@Components/seo";

//Misc
import { Router } from "@reach/router";
import { useFormState as useJobInfoState } from "@Core/PostJobForms/JobInfo/form-config";
import { useFormState as usePaymentState } from "@Core/PostJobForms/Payment/form-config";
// Import the Slate editor factory.
import { createEditor } from "slate";
// Import the Slate components and React plugin.
import { withReact } from "slate-react";
//Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Add Stripe.js and Elements to your page
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export const EditorsContext = createContext();

const PostJob = (props) => {
  //STATE
  const jobInfoStateVariable = useJobInfoState();
  const paymentStateVariable = usePaymentState();
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

  //@Context: The preview and postjob components shouldn't have to take an extra 'editor'
  // props to use the editor nodes from slate.
  return (
    <Elements stripe={stripePromise}>
      <EditorsContext.Provider
        value={{
          jobDescEditor: jobDescEditor,
          howToApplyEditor: howToApplyEditor,
        }}
      >
        <SEO title="Post a Job" />
        <Router basepath="/post-job">
          <Preview
            path="/preview"
            jobInfoStateVariable={jobInfoStateVariable}
            paymentStateVariable={paymentStateVariable}
          />
          <Forms
            path="/"
            jobInfoStateVariable={jobInfoStateVariable}
            paymentStateVariable={paymentStateVariable}
          />
        </Router>
      </EditorsContext.Provider>
    </Elements>
  );
};

export default PostJob;
