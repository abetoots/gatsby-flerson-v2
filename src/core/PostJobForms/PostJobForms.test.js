import useJobInfoState from "@Core/PostJobForms/JobInfo/form-config";
import usePaymentState from "@Core/PostJobForms/Payment/form-config";
import { render, waitFor } from "@Shared/test/postjobform-utils";
import user from "@testing-library/user-event";
import { axe } from "jest-axe";
import PropTypes from "prop-types";
import React from "react";

import PostJobForms from "./PostJobForms";

const Wrapper = (props) => {
  const jobInfoStateVariable = useJobInfoState();
  const paymentStateVariable = usePaymentState();
  return props.render(jobInfoStateVariable, paymentStateVariable);
};

Wrapper.propTypes = {
  render: PropTypes.func,
};

// https://github.com/stripe/react-stripe-js/issues/59
const mockElement = () => ({
  mount: jest.fn(),
  destroy: jest.fn(),
  on: jest.fn(),
  update: jest.fn(),
});

const mockElements = () => {
  const elements = {};
  return {
    create: jest.fn((type) => {
      elements[type] = mockElement();
      return elements[type];
    }),
    getElement: jest.fn((type) => {
      return elements[type] || null;
    }),
  };
};

const mockStripe = () => ({
  elements: jest.fn(() => mockElements()),
  createToken: jest.fn(),
  createSource: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  paymentRequest: jest.fn(),
  _registerWrapper: jest.fn(),
});

jest.mock("@stripe/react-stripe-js", () => {
  const stripe = jest.requireActual("@stripe/react-stripe-js");

  return {
    ...stripe,
    Element: () => {
      return mockElement;
    },
    useStripe: () => {
      return mockStripe;
    },
    useElements: () => {
      return mockElements;
    },
  };
});

describe("PostJobForms", () => {
  it("has no accessibility violations", async () => {
    const { getAllByRole } = render(
      <Wrapper
        render={(a, b) => (
          <PostJobForms jobInfoStateVariable={a} paymentStateVariable={b} />
        )}
      />
    );
    const forms = getAllByRole("form");
    for (const form of forms) {
      const result = await axe(form);
      await waitFor(() => expect(result).toHaveNoViolations());
    }
  });

  it("finds ONE payment submit button, disabled when clicked", () => {
    const { getByLabelText } = render(
      <Wrapper
        render={(a, b) => (
          <PostJobForms jobInfoStateVariable={a} paymentStateVariable={b} />
        )}
      />
    );
    const button = getByLabelText(/payment button/i);
    expect(button).toHaveAttribute("type", "submit");
    //TODO mock handler
    // user.click(button);
    // expect(button).toBeDisabled();
  });

  it("shows error/success messages after submission", () => {
    //TODO mock handler
  });
});
