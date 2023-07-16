import * as Yup from "yup";

/*----------------------------------------------------
(GENERAL) LOGIN VALIDATION SCHEMA
-----------------------------------------------------*/
export const loginValidationSchema = Yup.object({
  data: Yup.string().required(
    "User's data is required to log in (email, phone number, or username can be used)"
  ),

  password: Yup.string().required("Password is required."),
});
