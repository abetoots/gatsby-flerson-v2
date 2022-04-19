import "./JobInfo.scss";

import FormInput from "@Components/composed/Form/FormInput/FormInput";
//Components
import RichEditor from "@Components/RichEditor/RichEditor";
import { EditorsContext } from "@Index/pages/post-job";
import React, { forwardRef, useContext, useState } from "react";

//Misc
import { applyInputs, companyInfoInputs, jobInfoInputs, uploadInput } from "./form-config";

const JobInfo = forwardRef(({ loading }, ref) => {
  const { jobDescEditor, howToApplyEditor } = useContext(EditorsContext);
  const [removeInput, setRemoveInput] = useState("");

  //LOCAL STATE
  //Rich Editor States:The actual HTML nodes can be serialized from
  // the editors itself , not the editor state. In the spirit of 'lifting state up', we lift
  // the editors instead, not our rich editor state.
  const [descState, setDescState] = useState(
    typeof window !== "undefined" && window.localStorage
      ? JSON.parse(localStorage.getItem("job_description")) || [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]
      : [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
  );
  const [howToApplyState, setHowToApplyState] = useState(
    typeof window !== "undefined" && window.localStorage
      ? JSON.parse(localStorage.getItem("job_description")) || [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]
      : [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
  );

  return (
    <div>
      <h2 className="JobInfo__heading">
        Job Information{" "}
        <span role="img" aria-label="icon of a briefcase">
          💼
        </span>
      </h2>

      <div style={{ marginBottom: "1.5rem" }}>
        {jobInfoInputs.map((input) => (
          <FormInput
            key={input.key}
            elType={input.elType}
            elementConfig={input.elementConfig}
            inputKey={input.key}
            validation={input?.validation}
            description={input.description || ""}
            removeInput={removeInput}
            runOnAction={(value) => {
              if (input?.toRemove) {
                if (value) {
                  setRemoveInput(input.toRemove);
                } else {
                  setRemoveInput("");
                }
              }
            }}
          />
        ))}

        <RichEditor
          editor={jobDescEditor}
          label="Job Description"
          state={descState}
          stateHandler={(value) => {
            setDescState(value);
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("job_description", content);
          }}
        />

        {applyInputs.map((input) => (
          <FormInput
            key={input.key}
            elType={input.elType}
            elementConfig={input.elementConfig}
            inputKey={input.key}
            validation={input?.validation}
            description={input.description || ""}
            removeInput={removeInput}
            runOnAction={(value) => {
              if (input?.toRemove) {
                if (value) {
                  setRemoveInput(input.toRemove);
                } else {
                  setRemoveInput("");
                }
              }
            }}
          />
        ))}
        <RichEditor
          editor={howToApplyEditor}
          label="How to Apply"
          state={howToApplyState}
          stateHandler={(value) => {
            setHowToApplyState(value);
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("how_to_apply", content);
          }}
        />
      </div>

      <div>
        <h2 className="JobInfo__heading">
          {" "}
          Employer Information{" "}
          <span role="img" aria-label="icon of file cabinet">
            🗃️
          </span>
        </h2>
        <div className="JobInfo__uploadWrapper">
          <FormInput
            key={uploadInput.key}
            elType={uploadInput.elType}
            elementConfig={uploadInput.elementConfig}
            inputKey={uploadInput.key}
            validation={uploadInput?.validation}
            description={uploadInput.description || ""}
          />
        </div>

        {companyInfoInputs.map((input) => (
          <FormInput
            key={input.key}
            elType={input.elType}
            elementConfig={input.elementConfig}
            inputKey={input.key}
            validation={input?.validation}
            description={input.description || ""}
          />
        ))}
      </div>
    </div>
  );
});

export default JobInfo;
