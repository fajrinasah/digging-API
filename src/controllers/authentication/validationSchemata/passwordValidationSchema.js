import * as Yup from "yup";

/*----------------------------------------------------
PASSWORD VALIDATION SCHEMA
-----------------------------------------------------*/
export const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least 1 letter, at least 1 uppercase letter, and at least 1 symbol. Symbols that can be used are @$!%*?&"
    ),
});
