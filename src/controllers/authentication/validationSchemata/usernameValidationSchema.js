import * as Yup from "yup";

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
  return await usernameValidationSchema.isValid({ username });
};
