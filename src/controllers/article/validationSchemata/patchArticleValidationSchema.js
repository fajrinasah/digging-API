import * as Yup from "yup";

/*----------------------------------------------------
PATCH ARTICLE VALIDATION SCHEMA
-----------------------------------------------------*/
export const patchValidationSchema = Yup.object({
  category_id: Yup.number("category_id data type is number."),

  headline: Yup.string().max(
    255,
    "Maximum length for headline is 255 characters."
  ),

  subheadline: Yup.string().max(
    255,
    "Maximum length for subheadline is 255 characters."
  ),

  mainshot_caption: Yup.string().max(
    255,
    "Maximum length for mainshot's caption is 255 characters."
  ),

  lede: Yup.string().max(65535, "Maximum length for lede is 65535 characters."),

  keywords: Yup.string().max(
    255,
    "Maximum length for keywords is 255 characters."
  ),

  content: Yup.string().max(
    4294967295,
    "Maximum length for content is 4294967295 characters."
  ),

  references: Yup.string().max(
    65535,
    "Maximum length for references is 65535 characters."
  ),
});
