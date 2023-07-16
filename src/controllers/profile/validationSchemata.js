import * as Yup from "yup";

export const ProfileValidationSchema = {
  display_name: Yup.string().max(
    45,
    "Display name's maximum length is 45 characters."
  ),

  about: Yup.string().max(200, "About's maximum length is 200 characters."),
};
