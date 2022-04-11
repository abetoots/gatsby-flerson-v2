import "./Payment.scss";

import ChromePicker from "@Components/Color/chrome";
import FormInput from "@Components/composed/Form/FormInput/FormInput";
import { ADD_ONS, CUSTOM_HIGHLIGHT, PAY_LATER } from "@Shared/utils/constants";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CheckboxWithColorPicker from "@Components/Inputs/Checkbox/Checkbox";
//Misc
import { addOnInputs, paymentInputs } from "./form-config";
//Components
import StripeInput from "./StripeInput/StripeInput";
import { useFormContext, Controller } from "react-hook-form";

const Payment = ({ ...props }) => {
  const { control, watch, setValue } = useFormContext();
  const payLater = watch(PAY_LATER);

  return (
    <div>
      <h2 className="Payment__heading">Payment Details</h2>
      {paymentInputs.map((input) => (
        <FormInput
          key={input.key}
          elType={input.elType}
          elementConfig={input.elementConfig}
          inputKey={input.key}
          validation={input?.validation}
          description={input.description || ""}
        />
      ))}
      <FormInput
        key={addOnInputs.key}
        elType={addOnInputs.elType}
        validation={addOnInputs?.validation}
        inputKey={addOnInputs.key}
        description={addOnInputs.description}
        renderInput={({ field }) => {
          return (
            <CheckboxWithColorPicker
              keyboardFocusOnly={addOnInputs.elementConfig.keyboardFocusOnly}
              options={addOnInputs.elementConfig.options}
              heading={addOnInputs.elementConfig.heading}
              value={field.value || addOnInputs}
              stateHandler={(newVal) => setValue(addOnInputs.key, newVal)}
              renderAfterOptionLabel={(currValue) => {
                if (currValue === CUSTOM_HIGHLIGHT) {
                  return (
                    <div style={{ marginLeft: "0.5rem", display: "flex", alignItems: "center" }}>
                      <ChromePicker color={props.brandColor} onChangeComplete={props.setBrandColor} />
                    </div>
                  );
                }
              }}
            />
          );
        }}
      />
      {process.env.ENABLE_PAYMENTS ? <StripeInput show={!payLater} /> : null}
    </div>
  );
};

Payment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Payment;
