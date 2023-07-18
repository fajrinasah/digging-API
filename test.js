// import cypto from 'crypto'
// const secret = cypto.randomBytes(32).toString('hex')
// console.log(secret)

// const art1 = {
//   category_id:,
//   headline: "",
//   subheadline: "",
//   mainshot_caption: "",
//   lede: "",
//   keywords: "",
//   content: "",
//   references: "",
// };

const art1 = {
  category_id: 7,
  headline: "Decoding Ancient Egypt: Insights from Ethnoarchaeology",
  subheadline:
    "Understanding Past Egyptian Societies through Contemporary Practices",
  mainshot_caption:
    "Ethnoarchaeologist documenting modern Egyptian cultural practices.",
  lede: "Ethnoarchaeology examines the practices and material culture of contemporary communities in Egypt to gain insights into ancient Egyptian societies. By studying modern traditions, crafts, architecture, and social behaviors, ethnoarchaeologists draw parallels and make inferences about the lifeways, technology, and cultural practices of the past. Through participant observation, interviews, and the analysis of material remains, this field provides valuable context for understanding ancient Egyptian civilization, its social structure, religious beliefs, and technological advancements.",
  keywords:
    "Ancient Egypt, contemporary practices, material culture, social behaviors, lifeways",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

const art2 = {
  category_id: 3,
  headline: "The Ancient Skywatchers of Chaco Canyon",
  subheadline:
    "How the Ancestral Puebloans aligned their buildings with the sun and moon cycles",
  mainshot_caption:
    "Aerial view of Pueblo Bonito, the largest great house in Chaco Canyon, New Mexico. Credit: National Park Service",
  lede: "For centuries, the Ancestral Puebloans of the American Southwest built monumental structures that were carefully oriented to the movements of the sun and moon. Archaeologists have uncovered evidence of sophisticated astronomical knowledge and practices among these ancient cultures, revealing a complex relationship between architecture, landscape and cosmology.",
  keywords: "Ancestral Puebloans, solstices, equinoxes, lunar standstills",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

const newArt = {
  category_id: 5,
  headline: "The Bones of Ancient Babylon",
  subheadline:
    "What animal remains can tell us about the life and culture of the Mesopotamian civilization",
  mainshot_caption:
    "Animal bones excavated from Babylon, dating from the 6th century BC to the 1st century AD. Credit: British Museum",
  lede: "Babylon was one of the most influential and powerful cities in the ancient world, the center of a vast empire that spanned from Egypt to Persia. But what was life like for its inhabitants, and how did they interact with the natural environment? A new study of animal bones found at the site reveals some surprising insights into the diet, economy, religion and politics of this ancient civilization.",
  keywords: "animal bones, diet, ritual, trade",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

const test = {
  category_id: 1,
  headline: "test headline",
  subheadline: "test subheadline",
  mainshot_caption: "test mainshot_caption",
  lede: "test lede",
  keywords: "test, keywords",
  content: "test content",
  references: "test references",
};

const newTest = {
  headline: "new headline",
  mainshot_caption: "new mainshot_caption",
  keywords: "new, test, keywords",
  references: "new test references",
};

console.log(JSON.stringify(newTest));
