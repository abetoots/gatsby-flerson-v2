import "./StripeInput.scss";

import FormInput from "@Components/composed/Form/FormInput/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import React from "react";

const cardStyles = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
  },
};

const StripeInput = ({ show }) => {
  return show ? (
    <FormInput
      classes={{ description: "StripeElement__description" }}
      label="Card Details"
      renderDescription={() => (
        <>
          <FontAwesomeIcon style={{ color: "#6BC059", margin: "0 5px" }} icon="lock" />
          Payment secured over HTTPS by Stripe
          <FontAwesomeIcon
            style={{
              color: "#5469d4",
              fontSize: "2.3em",
              margin: "0 5px",
            }}
            icon={["fab", "cc-stripe"]}
          />
        </>
      )}
      renderInput={() => <CardElement options={cardStyles} />}
    />
  ) : null;
};

StripeInput.defaultProps = {
  show: true,
};

StripeInput.propTypes = {
  show: PropTypes.bool,
};
export default StripeInput;
