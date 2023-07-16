import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid.")
    .matches(
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
      "Email domain must be included."
    )
    .min(10, "Email address' length should be between 10 to 45 characters.")
    .max(45, "Email address' length should be between 10 to 45 characters."),

  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number's length should be between 10 to 15 digits.")
    .max(15, "Phone number's length should be between 10 to 15 digits.")
    .matches(/^[0-9]+$/, "Phone number must only contains numbers (0-9)."),

  username: Yup.string()
    .required("Username is required.")
    .min(5, "Username's length should be between 5 to 20 characters.")
    .max(20, "Username's length should be between 5 to 20 characters."),

  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least 1 letter, at least 1 uppercase letter, and at least 1 symbol. Symbols that can be used are @$!%*?&"
    ),
});

/*----------------------------------------------------
(GENERAL) LOGIN VALIDATION SCHEMA
-----------------------------------------------------*/
export const loginValidationSchema = Yup.object({
  data: Yup.string().required(
    "User's data is required to log in (email, phone number, or username can be used)"
  ),

  password: Yup.string().required("Password is required."),
});

/*----------------------------------------------------
(DEFAULT) IF USER LOG IN WITH USERNAME
-----------------------------------------------------*/
export const usernameValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required.")
    .min(5, "Username's length should be between 5 to 20 characters.")
    .max(20, "Username's length should be between 5 to 20 characters."),

  // password: Yup.string()
  //   .required("Password is required.")
  //   .min(6, "Password must be at least 6 characters.")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //     "Password must contain at least 1 letter, at least 1 uppercase letter, and at least 1 symbol. Symbols that can be used are @$!%*?&"
  //   ),
});

export const isUsername = async (username) => {
  return await EmailValidationSchema.isValid({ username });
};

/*----------------------------------------------------
IF USER LOG IN WITH EMAIL
-----------------------------------------------------*/

export const EmailValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid.")
    .matches(
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
      "Email domain must be included."
    )
    .min(10, "Email address' length should be between 10 to 45 characters.")
    .max(45, "Email address' length should be between 10 to 45 characters."),
});

export const isEmail = async (email) => {
  return await EmailValidationSchema.isValid({ email });
};

/*----------------------------------------------------
IF USER LOG IN WITH PHONE NUMBER
-----------------------------------------------------*/

export const PhoneNumberValidationSchema = Yup.object({
  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number's length should be between 10 to 15 digits.")
    .max(15, "Phone number's length should be between 10 to 15 digits.")
    .matches(/^[0-9]+$/, "Phone number must only contains numbers (0-9)."),
});

export const isPhoneNumber = async (phone_number) => {
  return await EmailValidationSchema.isValid({ phone_number });
};
