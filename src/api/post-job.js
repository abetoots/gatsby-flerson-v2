import {
  APPLY_EMAIL,
  APPLY_URL,
  EMPLOYER_TYPE,
  LOCATION,
  POSITION,
  PRIMARY_TAG,
  SALARY,
  SALARY_TYPE,
  EMPLOYER_LOGO,
  ADD_ONS,
  PAY_LATER,
  SHOW_LOGO,
  PAYMENT_EMAIL,
  CUSTOM_HIGHLIGHT,
  BRAND_COLOR,
} from "../shared/utils/constants";
import clientPromise from "./db";

let db;

const handler = async (req, res) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive

  //   if (!db) {
  //     db = (await clientPromise).db();
  //   }
  //   console.log("db", db);

  // req.body has the form values
  console.log(req.body);
  console.log("logo", typeof req.body[PAY_LATER]);

  //post a job
  if (req.method === "POST") {
    // resp = api.getAll(req, db);
    //VALIDATION
    if (!req.body[POSITION]) {
      return res.status(422).json(POSITION + " field is required");
    }
    if (!req.body[LOCATION]) {
      return res.status(422).json(LOCATION + " field is required");
    }
    if (!req.body[PRIMARY_TAG]) {
      return res.status(422).json(PRIMARY_TAG + " field is required");
    }
    if (!req.body[EMPLOYER_TYPE]) {
      return res.status(422).json(EMPLOYER_TYPE + " field is required");
    }
    if (!req.body[SALARY]) {
      return res.status(422).json(SALARY + " field is required");
    }
    if (!req.body[SALARY_TYPE]) {
      return res.status(422).json(SALARY_TYPE + " field is required");
    }
    if (!req.body[PAYMENT_EMAIL]) {
      return res.status(422).json(PAYMENT_EMAIL + " field is required");
    }
    if (!req.body[APPLY_URL] && !req.body[APPLY_EMAIL]) {
      return res.status(422).json(`Either ${APPLY_URL} or ${APPLY_EMAIL} must be set`);
    }
    if (req.body[ADD_ONS].includes(SHOW_LOGO) && !req.body[EMPLOYER_LOGO][0]?.file) {
      return res.status(422).json("Employer logo is required when show logo is enabled");
    }
    if (req.body[ADD_ONS].includes(CUSTOM_HIGHLIGHT) && !req.body[BRAND_COLOR]) {
      return res.status(422).json("Brand color is required when custom highlight is enabled");
    }
  }

  res.status(200).json(req.body);
};

export default handler;
