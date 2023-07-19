// import cypto from 'crypto'
// const secret = cypto.randomBytes(32).toString('hex')
// console.log(secret)

// let art1 = {
//   category_id:,
//   headline: "",
//   subheadline: "",
//   mainshot_caption: "",
//   lede: "",
//   keywords: "",
// content: "This is supposed to be a long text.",
//   references: "References goes here.",
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
/*--------------------------------------------------------*/
let art3 = {
  category_id: 1,
  headline: "Exploring Ancient Shipwrecks: Unveiling the Secrets of the Deep",
  subheadline: "Diving into the History of Maritime Civilizations",
  mainshot_caption: "Divers examining artifacts from a sunken ship.",
  lede: "Underwater archaeology reveals captivating stories of seafaring cultures and lost treasures hidden beneath the waves. Through careful exploration and excavation of shipwrecks, researchers unlock valuable insights into ancient maritime civilizations and their maritime practices.",
  keywords: "shipwrecks, seafaring, excavation",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art4 = {
  category_id: 2,
  headline:
    "Unveiling Ancient Lives: Exploring Bioarchaeology's Human Tapestry",
  subheadline: "Piecing Together the Stories Encoded in Human Remains",
  mainshot_caption:
    "Examination of skeletal remains from an archaeological excavation.",
  lede: "Bioarchaeology delves into the intimate details of past societies by examining human remains. Through the careful analysis of bones, teeth, and other biological materials, bioarchaeologists unravel narratives of health, migration, social structures, and cultural practices. By connecting the individual stories encoded in human remains to broader historical contexts, this multidisciplinary field provides profound insights into the complex tapestry of human existence throughout time and across different cultures.",
  keywords:
    "skeletal analysis, social structures, cultural practices, historical contexts",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art5 = {
  category_id: 3,
  headline: "Unveiling the Celestial Mysteries: Exploring Archaeoastronomy",
  subheadline: "Decoding Ancient Astronomical Knowledge",
  mainshot_caption:
    "Ancient stone alignments indicating astronomical observations.",
  lede: "Archaeoastronomy investigates the relationship between ancient cultures and celestial bodies. By examining alignments, structures, and celestial symbolism, archaeoastronomers uncover the astronomical knowledge and practices of past societies. Through this exploration, we gain a deeper understanding of how celestial phenomena shaped cultural beliefs, religious practices, and navigational systems, offering unique insights into the ancient worldview.",
  keywords:
    "celestial bodies, alignments, celestial symbolism, religious practices, navigational systems",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art6 = {
  category_id: 4,
  headline: "Unearthing the Stories Written in the Land: Landscape Archaeology",
  subheadline: "Deciphering Human-Environment Interactions",
  mainshot_caption:
    "Aerial view of an archaeological site showing landscape features.",
  lede: "Landscape archaeology examines the dynamic relationship between humans and their environment throughout history. By studying the physical features, land use patterns, and cultural modifications of landscapes, researchers unravel the stories of past societies, their settlements, agriculture, and resource management strategies. This interdisciplinary field provides crucial insights into how human communities shaped and were influenced by the environments they inhabited, contributing to our understanding of long-term human-environment interactions.",
  keywords:
    " settlements, agriculture, resource management, cultural modifications",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art7 = {
  category_id: 5,
  headline:
    "Unlocking the Animal Kingdom of the Past: Insights from Zooarchaeology",
  subheadline: "Reconstructing Human-Animal Relationships",
  mainshot_caption:
    "Analysis of animal bone assemblages in a zooarchaeology lab.",
  lede: "Zooarchaeology investigates the relationships between humans and animals in the past through the study of animal remains. By analyzing animal bones, teeth, and other animal byproducts recovered from archaeological sites, zooarchaeologists reconstruct past ecosystems, subsistence strategies, hunting practices, domestication, and cultural beliefs. This field sheds light on the importance of animals in human societies, providing valuable insights into ancient human-animal interactions and the roles of animals in past cultures.",
  keywords:
    "subsistence strategies, hunting practices, domestication, cultural beliefs",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art8 = {
  category_id: 6,
  headline: "Seeds of the Past: Exploring Archaeobotany's Insights",
  subheadline: "Unveiling Ancient Plant Use and Agricultural Practices",
  mainshot_caption: "Microscopic analysis of ancient plant remains.",
  lede: "Archaeobotany studies the ancient plant remains preserved at archaeological sites, providing insights into past plant use, agriculture, diet, and environmental changes. By examining seeds, pollen, phytoliths, and other plant remains, archaeobotanists reconstruct ancient landscapes, agricultural practices, plant domestication, and the cultural significance of plants. This field enhances our understanding of the relationship between humans and plants throughout history, highlighting the vital role of plants in human societies.",
  keywords:
    "plant remains, agricultural practices, diet, environmental changes, plant domestication",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art9 = {
  category_id: 7,
  headline: "Living Archaeology: Exploring the Present to Understand the Past",
  subheadline:
    "Investigating Contemporary Societies for Insights into Ancient Cultures",
  mainshot_caption:
    "Ethnoarchaeologist conducting interviews with a contemporary community.",
  lede: "Ethnoarchaeology combines archaeological methods with the study of contemporary societies to gain insights into past cultures and behaviors. By examining modern practices, technologies, and cultural traditions, ethnoarchaeologists draw parallels and make inferences about past societies. Through participant observation, interviews, and material culture analysis, this field provides valuable context for interpreting archaeological remains and helps reconstruct ancient lifeways, social organization, and material practices.",
  keywords:
    "contemporary societies, ancient cultures, lifeways, social organization, material practices",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art10 = {
  category_id: 8,
  headline: "Unveiling the Past: Engaging Communities in Public Archaeology",
  subheadline:
    "Fostering Collaboration and Education for Heritage Preservation",
  mainshot_caption:
    "Students participating in a public archaeology excavation.",
  lede: "Public archaeology promotes active community engagement and participation in archaeological research and heritage preservation. Through collaborative excavations, educational programs, and public outreach initiatives, archaeologists work closely with communities to share knowledge, raise awareness about the importance of archaeological heritage, and foster a sense of stewardship. By involving the public in the process, public archaeology aims to bridge the gap between researchers and communities, ensuring the preservation and appreciation of our shared cultural heritage.",
  keywords:
    "community engagement, collaborative excavations, educational programs, heritage preservation, public outreach",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art11 = {
  category_id: 9,
  headline: "Preserving the Past: Cultural Resource Management in Action",
  subheadline: "Balancing Development and Heritage Conservation",
  mainshot_caption:
    "Archaeologists assessing the impact of a proposed development on heritage sites.",
  lede: "Cultural Resource Management (CRM) focuses on the protection and preservation of archaeological and cultural heritage resources in the face of development projects. By conducting surveys, assessments, and mitigation strategies, CRM professionals work to safeguard significant archaeological sites and artifacts. They ensure compliance with regulations, promote sustainable development, and strive to balance the needs of cultural heritage preservation with the demands of progress. CRM plays a vital role in managing and conserving our shared cultural heritage for future generations.",
  keywords:
    "heritage conservation, development projects, surveys, assessments, mitigation",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art12 = {
  category_id: 1,
  headline: "Unearthing a Lost City: The Submerged Ruins of Atlantis",
  subheadline: "Unveiling the Mythical Civilization of Atlantis",
  mainshot_caption: "Ruins of an ancient structure found underwater.",
  lede: "The legendary city of Atlantis, once thought to be a myth, has captivated imaginations for centuries. Recent underwater archaeological discoveries have shed light on the possible existence of this enigmatic civilization. Explorations of submerged ruins, combined with ancient texts and geological analysis, provide fascinating insights into the rise and fall of Atlantis, inviting us to reconsider its place in history.",
  keywords:
    "submerged ruins, mythical civilization, ancient texts, geological analysis",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art13 = {
  category_id: 8,
  headline: "How to Engage the Public with Archaeology",
  subheadline:
    "Tips and strategies for making archaeology accessible, relevant and fun for diverse audiences",
  mainshot_caption:
    "A group of children participating in an archaeological activity at the Archaeology Day in Boston, MA. Credit: Archaeological Institute of America",
  lede: "Archaeology is a fascinating and important field of study that can enrich our understanding of the past, present and future. But how can archaeologists share their findings and passion with the public, especially those who may not have access to or interest in academic publications or museums? In this article, we will explore some of the best practices and examples of public archaeology, a branch of archaeology that aims to engage, educate and empower the public through various forms of outreach and participation.",
  keywords: "outreach, education, participation, communication, engagement",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art14 = {
  category_id: 6,
  headline: "The Origins of Agriculture in the Fertile Crescent",
  subheadline:
    "How ancient plant remains shed light on the domestication of crops and the emergence of complex societies",
  mainshot_caption:
    "A map of the Fertile Crescent showing the locations of early agricultural sites. Credit: Nature",
  lede: "The Fertile Crescent is a region in the Middle East that stretches from the Nile Valley in Egypt to the Zagros Mountains in Iran. It is widely regarded as the cradle of civilization, where some of the earliest forms of writing, urbanization, and state formation emerged. But what enabled this remarkable cultural development? A key factor was the invention of agriculture, the cultivation of plants and animals for food and other purposes. In this article, we will examine how archaeobotany, the study of ancient plant remains, can help us understand the origins and evolution of agriculture in the Fertile Crescent, and its impact on human history.",
  keywords: "agriculture, domestication, crops, civilization",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art15 = {
  category_id: 9,
  headline: "The Challenges and Opportunities of CRM Archaeology",
  subheadline:
    "How cultural resource management archaeologists balance the needs of preservation, development and public interest",
  mainshot_caption:
    "A CRM archaeologist working at a construction site. Credit: Academia.edu",
  lede: "Cultural resource management (CRM) archaeology is a branch of archaeology that deals with the identification, evaluation and mitigation of archaeological sites and materials that are affected by development projects, such as roads, dams, pipelines, or buildings. CRM archaeologists work in collaboration with government agencies, private companies, and indigenous communities to ensure that the cultural heritage of the land is respected and protected. In this article, we will explore some of the challenges and opportunities that CRM archaeologists face in their work, such as ethical dilemmas, legal regulations, public outreach, and career prospects.",
  keywords: "preservation, development, public interest",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art16 = {
  category_id: 1,
  headline:
    "A Submerged 7,000-Year-Old Discovery Shows the Great Potential of Underwater Archaeology",
  subheadline:
    "Archaeologists have discovered the oldest underwater site ever found on the Australian continent",
  mainshot_caption:
    "Turquoise waters of the Murujuga site. Flinders University",
  lede: "Stone tools scattered on the seafloor mark the ancient presence of Aboriginal people in a region that was once dry land",
  keywords: "Australia, Murujuga, stone tools, sea level",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

let art17 = {
  category_id: 2,
  headline: "The Road to the Afterlife",
  subheadline:
    "How ancient Egyptians prepared their bodies for the journey to the next world",
  mainshot_caption: "A mummy mask from the Ptolemaic period (332-30 BCE)",
  lede: "Mummification preserves the body in the most life-like state possible. Mummification, or the embalming of a dead body, was practiced throughout most of ancient Egyptian history. Everyone, rich or poor, received some kind of embalming process after death.",
  keywords: "mummification, ancient Egypt, afterlife, embalming",
  content: "This is supposed to be a long text.",
  references: "References goes here.",
};

const stringify = (art) => {
  console.log(JSON.stringify(art));
};

stringify(art14);
