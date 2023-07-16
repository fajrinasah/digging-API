import * as Yup from "yup";

/*----------------------------------------------------
ABOUT VALIDATION SCHEMA
-----------------------------------------------------*/
export const aboutValidationSchema = {
  about: Yup.string().max(200, "About's maximum length is 200 characters."),
};
