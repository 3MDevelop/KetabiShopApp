// constants/api.ts
export const API = {
  ROOT_URL: "https://ketabishop.com",
  BASE_URL: "https://ketabishop.com/api",

  /* get pages layout */
  getHome: "https://ketabishop.com/api/gethome/",
  getCategury: "",
  getOffers: "",

  /* get Data */
  getList: "https://ketabishop.com/api/getlist/",
  getProduct: "https://ketabishop.com/api/getproduct/",

  /* login */
  OTP: "https://ketabika.com/v1/otp/",
  VERIFY: "https://ketabika.com/v1/verify/",

  /* from local json */
  getstatic: "https://ketabishop.com/api/getstatic/",

  
} as const;
