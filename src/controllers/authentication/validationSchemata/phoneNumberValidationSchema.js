import * as Yup from "yup";

/*----------------------------------------------------
IF USER LOG IN WITH PHONE NUMBER
-----------------------------------------------------*/
export const phoneNumberValidationSchema = Yup.object({
  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number's length should be between 10 to 15 digits.")
    .max(15, "Phone number's length should be between 10 to 15 digits.")
    .matches(/^[0-9]+$/, "Phone number must only contains numbers (0-9)."),
});

export const isPhoneNumber = async (phone_number) => {
  return await phoneNumberValidationSchema.isValid({ phone_number });
};
