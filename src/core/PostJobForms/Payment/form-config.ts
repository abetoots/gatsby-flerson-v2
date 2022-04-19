import { InputGroupConfig } from "@Index/shared/utils/types";
import { initForm } from "@Shared/api/form";
import {
  ADD_ONS,
  CUSTOM_HIGHLIGHT,
  INVOICE_ADDRESS,
  NORMAL_HIGHLIGHT,
  PAY_LATER,
  PAYMENT_EMAIL,
  SHOW_LOGO,
  STICKY_MONTH,
  STICKY_WEEK,
} from "@Shared/utils/constants";

export const ADDON_PRICES = {
  [NORMAL_HIGHLIGHT]: 50,
  [CUSTOM_HIGHLIGHT]: 100,
  [STICKY_WEEK]: 100,
  [STICKY_MONTH]: 200,
  [SHOW_LOGO]: 20,
};

export const paymentInputs: InputGroupConfig[] = [
  {
    key: PAYMENT_EMAIL,
    description: "We'll use this to send your invoice/receipt.",
    elType: "input",
    elementConfig: {
      heading: "Payment Email",
      type: "email",
    },
    validation: {
      required: true,
    },
    initialValue: "",
  },
  {
    key: INVOICE_ADDRESS,
    description: "Specify company address to put on the invoice. Invoices are sent when pay later is selected",
    elType: "input",
    elementConfig: {
      heading: "Invoice Address",
      type: "text",
    },
    initialValue: "",
  },
  {
    key: PAY_LATER,
    elType: "toggle",
    elementConfig: {
      heading: "Pay Later?",
    },
    initialValue: false,
  },
];

export const addOnInputs: InputGroupConfig = {
  key: ADD_ONS,
  description: "Attract more leads and get the most out of your 30 days",
  elType: "checkbox",
  elementConfig: {
    heading: "Upgrade my job post 🔺",
    keyboardFocusOnly: true,
    options: [
      {
        value: NORMAL_HIGHLIGHT,
        label: `Highlight my post (+$${ADDON_PRICES[NORMAL_HIGHLIGHT]})`,
        removes: CUSTOM_HIGHLIGHT,
      },
      {
        value: CUSTOM_HIGHLIGHT,
        label: `Highlight my post with my brand colors (+$${ADDON_PRICES[CUSTOM_HIGHLIGHT]})`,
        removes: NORMAL_HIGHLIGHT,
        customLabel: true,
      },
      {
        value: STICKY_WEEK,
        label: `Feature my post on the homepage so it stays on top for 1 week (+$${ADDON_PRICES[STICKY_WEEK]})`,
        removes: STICKY_MONTH,
      },
      {
        value: STICKY_MONTH,
        label: `Feature my post on the homepage so it stays on top for 1 month (+$${ADDON_PRICES[STICKY_MONTH]})`,
        removes: STICKY_WEEK,
      },
      {
        value: SHOW_LOGO,
        label: `Show my company logo (+$${ADDON_PRICES[SHOW_LOGO]})`,
      },
    ],
  },
  initialValue: [SHOW_LOGO],
};

const inputGroup = paymentInputs.concat([addOnInputs]);
export const defaultValues: any = {};
inputGroup.forEach((input) => (defaultValues[input.key] = input.initialValue));

export default inputGroup;
