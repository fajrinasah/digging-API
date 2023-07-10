import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid.")
    .matches(
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
      "Email domain must be included."
    ),
  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number must contain at least 10 numbers.")
    .matches(/^[0-9]+$/, "Phone number must only iclude numbers."),
  username: Yup.string()
    .required("Username is required.")
    .min(5, "Username must be at least 5 characters.")
    .max(20, "Username cannot be more than 20 characters."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least 6 characters, min. 1 letter, min. 1 uppercase letter, min. 1 symbol (symbols that can be used are @$!%*?&"
    ),
});

/*----------------------------------------------------
(DEFAULT) IF USER LOG IN WITH USERNAME
-----------------------------------------------------*/
export const LoginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

/*----------------------------------------------------
IF USER LOG IN WITH EMAIL
-----------------------------------------------------*/
export const IsEmail = async (email) => {
  return await EmailValidationSchema.isValid({ email });
};

export const EmailValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid.")
    .matches(
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
      "Email domain must be included."
    ),
});

/*----------------------------------------------------
IF USER LOG IN WITH PHONE NUMBER
-----------------------------------------------------*/
export const IsPhoneNumber = async (phone_number) => {
  return await EmailValidationSchema.isValid({ phone_number });
};

export const PhoneNumberValidationSchema = Yup.object({
  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number must contain at least 10 numbers.")
    .matches(/^[0-9]+$/, "Phone number must only iclude numbers."),
});
