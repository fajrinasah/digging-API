import * as Yup from "yup";

export const ArticleValidationSchema = Yup.object({
  category_id: Yup.number("category_id data type is number."),

  headline: Yup.string()
    .required("Headline is required.")
    .max(255, "Maximum length for headline is 255 characters."),

  subheadline: Yup.string()
    .required("Subheadline is required.")
    .max(255, "Maximum length for subheadline is 255 characters."),

  mainshot_caption: Yup.string()
    .required("Mainshot's caption is required.")
    .max(255, "Maximum length for mainshot's caption is 255 characters."),

  lede: Yup.string()
    .required("Lede is required.")
    .max(65535, "Maximum length for lede is 65535 characters."),

  keywords: Yup.string()
    .required("Keywords is required.")
    .max(255, "Maximum length for keywords is 255 characters."),

  content: Yup.string()
    .required("Content is required.")
    .max(4294967295, "Maximum length for content is 4294967295 characters."),

  references: Yup.string()
    .required("References is required.")
    .max(65535, "Maximum length for references is 65535 characters."),
});
