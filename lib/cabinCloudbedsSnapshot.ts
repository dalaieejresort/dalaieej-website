import type { CabinSlug } from "./cabinCatalog";

type Localized = { en: string; mn: string };

export type CabinCloudbedsFact = {
  slug: CabinSlug;
  roomTypeID: string;
  name: string;
  maxGuests: number;
  maxAdults?: number;
  roomSizeLabel?: Localized;
  guestLabel: Localized;
  bedLabel: Localized;
  bathroomLabel: Localized;
  showerLabel: Localized;
  heatingLabel: Localized;
  viewLabel: Localized;
  equipmentLabels: Localized[];
  shortDescription: Localized;
  description: Localized;
  features: string[];
};

const EQUIPMENT = {
  lakeView: { en: "Lake view", mn: "Нуурын харагдац" },
  selectLakeViewCabins: {
    en: "Select units with lake view",
    mn: "Зарим байшин нуурын харагдацтай",
  },
  selectLakeViewRooms: {
    en: "Select rooms with lake view",
    mn: "Зарим өрөө нуурын харагдацтай",
  },
  tv: { en: "TV", mn: "Зурагт" },
  selectTv: {
    en: "Select units with TV",
    mn: "Зарим байшин зурагттай",
  },
  electricHeater: { en: "Electric heater", mn: "Тень" },
  electricity: { en: "Electricity and outlets", mn: "Цахилгаан, залгууртай" },
  forestSetting: { en: "Forest setting", mn: "Ойн гүнд байрлалтай" },
  originalWood: {
    en: "Original wooden build, no modern renovation",
    mn: "Орчин үеийн засваргүй, анхны модон хийцээрээ",
  },
  setBackForest: {
    en: "Set back in the forest, away from the restaurant and lake",
    mn: "Ресторан болон нуурын эргээс зайдуу, ойн гүнд",
  },
  simpleFurnishing: { en: "Simple camp-style furnishing", mn: "Энгийн тохижилттой" },
  toiletInside: { en: "Toilet inside", mn: "Дотроо 00-той" },
} satisfies Record<string, Localized>;

const INCLUDED_SERVICES =
  "Өглөөний цай багтсан. Мөн иогийн хичээл, явган аялал, сэлүүрт завь, саун (1 удаа үнэгүй). Далай Ээжийн хойгт нэвтрэх эрхтэй.";

const INCLUDED_SERVICES_EN =
  "Breakfast is included. You also get 1 free session of yoga class, guided hike, kayaking, and sauna. Entry to the Dalai Eej peninsula is included.";

const CAMPING_INCLUDED_SERVICES =
  "Иогийн хичээл, явган аялал, сэлүүрт завь, саун (нийтийн цагаар, 1 удаа үнэгүй). Далай Ээжийн хойгт нэвтрэх эрхтэй.";

const CAMPING_INCLUDED_SERVICES_EN =
  "You get 1 free session of yoga class, guided hike, kayaking, and sauna (during public hours). Entry to the Dalai Eej peninsula is included.";

export const CABIN_CLOUDBEDS_FACTS: Record<CabinSlug, CabinCloudbedsFact> = {
  "superior-cabin": {
    slug: "superior-cabin",
    roomTypeID: "198039847624896",
    name: "Ерөнхийлөгчийн Хаус",
    maxGuests: 5,
    roomSizeLabel: { en: "50 m²", mn: "50 м²" },
    guestLabel: { en: "Up to 5 guests", mn: "5 хүн хүртэл" },
    bedLabel: { en: "2 double beds + 1 single bed", mn: "2 өргөн ор + 1 нарийн ор" },
    bathroomLabel: { en: "Toilet and washbasin inside", mn: "Дотроо 00, угаалтууртай" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Wood-burning stove", mn: "Галлагаатай зуух" },
    viewLabel: { en: "Lake view", mn: "Нуурын харагдац" },
    equipmentLabels: [EQUIPMENT.lakeView, EQUIPMENT.tv, EQUIPMENT.toiletInside],
    shortDescription: {
      en: "Our largest family stay, with two double beds, one single bed, and a quiet lake view.",
      mn: "Хоёр өргөн ор, нэг нарийн ортой, нуурын нам гүм харагдацтай манай хамгийн том байр.",
    },
    description: {
      en: `Our largest family stay, made for guests who want more room around them. Ерөнхийлөгчийн Хаус sleeps up to 5 guests, with two double beds, one single bed, a wood-burning stove, lake views, and a toilet and washbasin inside. Shared showers are nearby. ${INCLUDED_SERVICES_EN}`,
      mn: `Илүү уужим зай хүссэн гэр бүл, олуулаа аялагчдад зориулсан манай хамгийн том байр. Ерөнхийлөгчийн Хаус нь хоёр өргөн ор, нэг нарийн ортой, 5 хүн хүртэл байрлах боломжтой, галлагаатай зуухтай, нуурын харагдацтай, дотроо 00 болон угаалтууртай. Шүршүүрийг нийтийн байгууламжаас ашиглана. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Галлагаатай зуух",
      "Дотроо 00, угаалтууртай",
      "Нийтийн шүршүүр ашиглана",
      "Нуурын харагдац",
      "Минибар",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "triple-traditional-cabin": {
    slug: "triple-traditional-cabin",
    roomTypeID: "196467430240449",
    name: "Тухтай Хаус (Галлагаатай)",
    maxGuests: 3,
    roomSizeLabel: { en: "25-30 m²", mn: "25-30 м²" },
    guestLabel: { en: "Up to 3 guests", mn: "3 хүн хүртэл" },
    bedLabel: { en: "1 double + 1 single bed", mn: "1 өргөн ор + 1 нарийн ор" },
    bathroomLabel: { en: "Toilet and washbasin inside", mn: "Дотроо 00, угаалтууртай" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Wood-burning stove", mn: "Галлагаатай зуух" },
    viewLabel: { en: "Lake view", mn: "Нуурын харагдац" },
    equipmentLabels: [
      EQUIPMENT.toiletInside,
      EQUIPMENT.selectLakeViewCabins,
      EQUIPMENT.selectTv,
    ],
    shortDescription: {
      en: "A warm wood-fired cabin with one double bed, one single bed, and lake views.",
      mn: "Нэг өргөн ор, нэг нарийн ортой, нуурын харагдацтай дулаан галлагаатай байшин.",
    },
    description: {
      en: `A warm wood-fired cabin for couples or small families who like the feeling of a real fire at night. It sleeps up to 3 guests, with one double bed, one single bed, and a toilet and washbasin inside. Shared showers are nearby. ${INCLUDED_SERVICES_EN}`,
      mn: `Шөнөдөө галын дулаан мэдрэх дуртай хосууд, цөөн ам бүлтэй гэр бүлд тохиромжтой тухтай байшин. Нэг өргөн ор, нэг нарийн ортой, 3 хүн хүртэл байрлах боломжтой, дотроо 00 болон угаалтууртай. Шүршүүрийг нийтийн байгууламжаас ашиглана. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Галлагаатай зуух",
      "Дотроо 00, угаалтууртай",
      "Нуурын харагдац",
      "Минибар",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "lakeside-cabin": {
    slug: "lakeside-cabin",
    roomTypeID: "198020352975040",
    name: "Эрэг дээрх Хаус",
    maxGuests: 4,
    maxAdults: 4,
    roomSizeLabel: { en: "40 m²", mn: "40 м²" },
    guestLabel: { en: "Up to 4 guests (max 4 adults)", mn: "4 хүн хүртэл (4 хүртэлх том хүн)" },
    bedLabel: { en: "Flexible lakeside layout", mn: "Нуурын эргийн уян хатан байрлал" },
    bathroomLabel: { en: "Shared facilities", mn: "Нийтийн ариун цэврийн байгууламж" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Wood-burning stove", mn: "Галлагаатай зуух" },
    viewLabel: { en: "Closest to the lake", mn: "Нуурын эрэгт хамгийн ойр" },
    equipmentLabels: [EQUIPMENT.lakeView],
    shortDescription: {
      en: "Closest to the water, a wood-fired lakeside cabin with shared bathroom and shower facilities nearby.",
      mn: "Нуурын усанд хамгийн ойр, нийтийн ариун цэвэр, шүршүүр ашигладаг галлагаатай байшин.",
    },
    description: {
      en: `Closest to the water, this wood-fired lakeside cabin is for slow mornings and long looks across the lake. It sleeps up to 4 guests and uses the shared bathroom and shower facilities nearby. There is no private indoor toilet or shower. ${INCLUDED_SERVICES_EN}`,
      mn: `Нуурын усанд хамгийн ойр байрлах энэ галлагаатай байшин нь удаан өглөө, цонхоор харах нам гүмд дуртай зочдод тохиромжтой. 4 хүн хүртэл байрлах боломжтой бөгөөд ариун цэврийн өрөө, шүршүүрийг нийтийн байгууламжаас ашиглана. Дотроо хувийн 00 болон шүршүүргүй. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Галлагаатай зуух",
      "Нийтийн шүршүүр ашиглана",
      "Нуурын харагдац",
      "Минибар",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "triple-electric-cabin": {
    slug: "triple-electric-cabin",
    roomTypeID: "198036698427584",
    name: "Тухтай Хаус (Цахилгаан халаалт)",
    maxGuests: 3,
    roomSizeLabel: { en: "20 m²", mn: "20 м²" },
    guestLabel: { en: "Up to 3 guests", mn: "3 хүн хүртэл" },
    bedLabel: { en: "1 double + 1 single bed", mn: "1 өргөн ор + 1 нарийн ор" },
    bathroomLabel: { en: "Toilet and washbasin inside", mn: "Дотроо 00, угаалтууртай" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Electric heating", mn: "Цахилгаан халаалт" },
    viewLabel: { en: "Lake view", mn: "Нуурын харагдац" },
    equipmentLabels: [EQUIPMENT.electricHeater, EQUIPMENT.toiletInside],
    shortDescription: {
      en: "A steady, warm electric cabin with one double bed, one single bed, and lake views.",
      mn: "Нэг өргөн ор, нэг нарийн ортой, нуурын харагдацтай тогтмол дулаан цахилгаан халаалттай байшин.",
    },
    description: {
      en: `A steady, warm cabin for couples or small families who prefer electric heating. It sleeps up to 3 guests, with one double bed, one single bed, lake views, and a toilet and washbasin inside. Shared showers are nearby. ${INCLUDED_SERVICES_EN}`,
      mn: `Цахилгаан халаалттай, тогтмол дулаан тухтай байшин. Хосууд эсвэл цөөн ам бүлтэй гэр бүлд тохиромжтой. Нэг өргөн ор, нэг нарийн ортой, 3 хүн хүртэл байрлах боломжтой, нуурын харагдацтай, дотроо 00 болон угаалтууртай. Шүршүүрийг нийтийн байгууламжаас ашиглана. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Цахилгаан халаалт",
      "Дотроо 00, угаалтууртай",
      "Нийтийн шүршүүр ашиглана",
      "Нуурын харагдац",
      "Телевиз",
      "Минибар",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "signature-cabin": {
    slug: "signature-cabin",
    roomTypeID: "197943412437120",
    name: "Энгийн Байр",
    maxGuests: 2,
    guestLabel: { en: "Up to 2 adults", mn: "2 том хүн хүртэл" },
    bedLabel: { en: "Couple / solo layout", mn: "Хос болон ганцаарчилсан аялагчид" },
    bathroomLabel: { en: "Shared facilities", mn: "Нийтийн ариун цэврийн байгууламж" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Electric heating", mn: "Цахилгаан халаалт" },
    viewLabel: { en: "Near the lake", mn: "Нуурын эрэгтэй ойр" },
    equipmentLabels: [EQUIPMENT.selectLakeViewRooms],
    shortDescription: {
      en: "A simple, warm stay near the lake for solo travellers or two guests.",
      mn: "Ганцаараа аялагч эсвэл хоёр зочинд тохиромжтой, нууртай ойрхон энгийн дулаахан байр.",
    },
    description: {
      en: `A simple, warm stay near the lake for solo travellers or 2 adults. It keeps things easy and close to nature, with electric heating and shared bathroom and shower facilities nearby. ${INCLUDED_SERVICES_EN}`,
      mn: `Ганцаараа аялагч эсвэл хоёр том хүнд тохиромжтой, нууртай ойрхон энгийн дулаахан байр. Цахилгаан халаалттай, байгальд ойр, хэрэгтэй зүйлс нь цэгцтэй. Ариун цэврийн өрөө, шүршүүрийг нийтийн байгууламжаас ашиглана. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Цахилгаан халаалт",
      "Нийтийн шүршүүр ашиглана",
      "Өглөөний цай багтсан",
      "Саун (нийтийн цагаар, 1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "original-camp-cabin": {
    slug: "original-camp-cabin",
    roomTypeID: "248639578054784",
    name: "Анхны Зуслангийн Байр (Галлагаатай)",
    maxGuests: 4,
    maxAdults: 4,
    roomSizeLabel: { en: "30 m²", mn: "30 м²" },
    guestLabel: { en: "Up to 4 guests (max 4 adults)", mn: "4 хүн хүртэл (4 хүртэлх том хүн)" },
    bedLabel: {
      en: "2 double beds (some cabins have 3 smaller double-style beds)",
      mn: "2 өргөн ортой (зарим байшин 3 жижигрүүлсэн өргөн ортой)",
    },
    bathroomLabel: { en: "Shared facilities", mn: "Нийтийн ариун цэврийн байгууламж" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Wood-burning stove", mn: "Галлагаатай зуух" },
    viewLabel: { en: "Quiet forest setting", mn: "Ойн харагдац, нам гүм орчин" },
    equipmentLabels: [
      EQUIPMENT.electricity,
      EQUIPMENT.originalWood,
      EQUIPMENT.setBackForest,
      EQUIPMENT.simpleFurnishing,
    ],
    shortDescription: {
      en: "The simple forest cabin where Dalai Eej's story began, kept close to its original camp character.",
      mn: "\"Далай ээж\"-ийн түүх эхэлсэн, унаган төрхөөрөө буй ойн гүн дэх эгэл модон байшин.",
    },
    description: {
      en: `Dalai Eej's most simple, original wooden cabins, set back in the forest away from the restaurant and lakeshore. They are made for guests who want a quieter stay with the smell of wood and the feeling of old summer-camp calm. Most cabins have 2 double beds; one cabin has 3 smaller double-style beds. The cabins have electricity, outlets, and a wood-burning stove, but no modern renovation and no private indoor toilet or shower. Shared bathroom and shower facilities are a short walk away. ${INCLUDED_SERVICES_EN}`,
      mn: `Далай Ээж амралтын газрын хамгийн эгэл, унаган төрхөөрөө үлдсэн модон байшингууд. Ресторан болон нуурын эргээс бага зэрэг зайдуу, ойн гүнд байрлах тул бусдаас тусгаарлагдсан, илүү нам гүм орчинд амарч, модны үнэр, жинхэнэ амар амгаланг мэдрэхийг хүссэн зочдод яг тохирно. 2 өргөн ортой (зарим байшин 3 ортой), ямар нэгэн орчин үеийн засваргүй. Цахилгаан, залгууртай, галлагаатай зуухтай. Нийтийн ариун цэврийн өрөө, шүршүүр ашиглана. Өглөөний цай багтсан. Мөн иогийн хичээл, явган аялал, сэлүүрт завь, саун (1 удаа үнэгүй). Далай Ээжийн хойгт нэвтрэх эрхтэй.`,
    },
    features: [
      "Галлагаатай зуух",
      "Цахилгаан, залгууртай",
      "2 өргөн ортой (зарим байшин 3 ортой)",
      "Орчин үеийн засваргүй, анхны модон хийцээрээ",
      "Ресторан болон нуурын эргээс зайдуу, ойн гүнд",
      "Нийтийн ариун цэврийн өрөө, шүршүүр ашиглана",
      "Ойн харагдац, нам гүм орчин",
      "Энгийн тохижилттой",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "quad-electric-cabin": {
    slug: "quad-electric-cabin",
    roomTypeID: "198046100787328",
    name: "Гэр Бүлийн Хаус (Цахилгаан халаалт)",
    maxGuests: 5,
    maxAdults: 4,
    roomSizeLabel: { en: "25 m²", mn: "25 м²" },
    guestLabel: { en: "Up to 5 guests (max 4 adults)", mn: "5 хүн хүртэл (4 хүртэлх том хүн)" },
    bedLabel: { en: "2 double beds", mn: "2 дабл хэмжээтэй ор" },
    bathroomLabel: { en: "Toilet and washbasin inside", mn: "Дотроо 00, угаалтууртай" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Electric heating", mn: "Цахилгаан халаалт" },
    viewLabel: { en: "Lake view", mn: "Нуурын харагдац" },
    equipmentLabels: [EQUIPMENT.lakeView, EQUIPMENT.electricHeater, EQUIPMENT.toiletInside],
    shortDescription: {
      en: "A compact electric family cabin with two double beds and steady warmth through the night.",
      mn: "Хоёр дабл ортой, шөнөжин тогтмол дулаан цахилгаан халаалттай гэр бүлийн байшин.",
    },
    description: {
      en: `A compact family cabin with reliable electric warmth through the night. It sleeps up to 5 guests, with two double beds, lake views, and a toilet and washbasin inside. Shared showers are nearby. ${INCLUDED_SERVICES_EN}`,
      mn: `Шөнөжин тогтмол дулаан байх цахилгаан халаалттай гэр бүлийн байшин. Хоёр дабл ортой, 5 хүн хүртэл байрлах боломжтой, нуурын харагдацтай, дотроо 00 болон угаалтууртай. Шүршүүрийг нийтийн байгууламжаас ашиглана. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Цахилгаан халаалт",
      "Дотроо 00, угаалтууртай",
      "Нуурын харагдац",
      "Минибар",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  "grand-peninsula-suite": {
    slug: "grand-peninsula-suite",
    roomTypeID: "198038298677377",
    name: "Гэр Бүлийн Хаус (Галлагаатай)",
    maxGuests: 5,
    maxAdults: 4,
    roomSizeLabel: { en: "35 m²", mn: "35 м²" },
    guestLabel: { en: "Up to 5 guests (max 4 adults)", mn: "5 хүн хүртэл (4 хүртэлх том хүн)" },
    bedLabel: { en: "2 double beds", mn: "2 өргөн ор" },
    bathroomLabel: { en: "Toilet and washbasin inside", mn: "Дотроо 00, угаалтууртай" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Wood-burning stove", mn: "Галлагаатай зуух" },
    viewLabel: { en: "Lake view", mn: "Нуурын харагдац" },
    equipmentLabels: [EQUIPMENT.lakeView, EQUIPMENT.tv, EQUIPMENT.toiletInside],
    shortDescription: {
      en: "A wood-fired family cabin with two double beds, lake views, and room to stay together.",
      mn: "Хоёр өргөн ортой, нуурын харагдацтай, гэр бүлээрээ хамт амрах галлагаатай байшин.",
    },
    description: {
      en: `A wood-fired family cabin for staying together in one warm, shared space. It sleeps up to 5 guests, with two double beds, lake views, and a toilet and washbasin inside. Shared showers are nearby. ${INCLUDED_SERVICES_EN}`,
      mn: `Гэр бүлээрээ нэг дор, галын дулаантай амрахад тохиромжтой галлагаатай байшин. Хоёр өргөн ортой, 5 хүн хүртэл байрлах боломжтой, нуурын харагдацтай, дотроо 00 болон угаалтууртай. Шүршүүрийг нийтийн байгууламжаас ашиглана. ${INCLUDED_SERVICES}`,
    },
    features: [
      "Галлагаатай зуух",
      "Дотроо 00, угаалтууртай",
      "Нийтийн шүршүүр ашиглана",
      "Нуурын харагдац",
      "Телевиз",
      "Минибар",
      "Өглөөний цай багтсан",
      "Саун (1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
  camping: {
    slug: "camping",
    roomTypeID: "198042256253056",
    name: "Аялагчийн Отог",
    maxGuests: 12,
    guestLabel: { en: "Up to 12 guests", mn: "12 хүн хүртэл" },
    bedLabel: { en: "Tent or vehicle camping", mn: "Майхан болон машинтай аялагчид" },
    bathroomLabel: { en: "Shared facilities", mn: "Нийтийн ариун цэврийн байгууламж" },
    showerLabel: { en: "Shared shower", mn: "Нийтийн шүршүүр ашиглана" },
    heatingLabel: { en: "Outdoor setup", mn: "Гадаа байрлал" },
    viewLabel: { en: "Secure camping grounds", mn: "Хамгаалалттай кемпийн бүс" },
    equipmentLabels: [],
    shortDescription: {
      en: "A private camping area for travellers arriving with tents or vehicles.",
      mn: "Майхан эсвэл машинтай аялагчдад зориулсан хувийн отоглох хэсэг.",
    },
    description: {
      en: `A private camping area for travellers arriving with tents or vehicles. It gives you a secure place to stay, with access to fresh water, hot showers, and the wider resort services. ${CAMPING_INCLUDED_SERVICES_EN}`,
      mn: `Майхан эсвэл машинтай аялагчдад зориулсан хувийн отоглох хэсэг. Аюулгүй хоноглох орчинтой бөгөөд цэвэр ус, халуун шүршүүр болон амралтын газрын бусад үйлчилгээг ашиглах боломжтой. ${CAMPING_INCLUDED_SERVICES}`,
    },
    features: [
      "\"Далай Ээж\" хойгт нэвтрэх эрх",
      "Нийтийн шүршүүр ашиглана",
      "Саун (нийтийн цагаар, 1 удаа үнэгүй)",
      "Сэлүүрт завь (1 удаа үнэгүй)",
      "Иогийн хичээл (1 удаа үнэгүй)",
      "Явган аялал (1 удаа үнэгүй)",
    ],
  },
};

export function getCabinCloudbedsFact(slug: string): CabinCloudbedsFact | undefined {
  return CABIN_CLOUDBEDS_FACTS[slug as CabinSlug];
}
