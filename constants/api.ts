// constants/api.ts
export const API = {
  /* get pages layout */
  getHome: "https://ketabishop.com/api/gethome/",


  /* get Data */
  getList: "https://ketabishop.com/api/getlist/",
  getProduct: "https://ketabishop.com/api/getproduct/",
  
  
  /* Address */
  getAddress: "https://ketabishop.com/api/getAddress/",
  setAddress: "https://ketabishop.com/api/setAddress/",
  deleteAddress: "https://ketabishop.com/api/deleteAddress/",
  getCity: "https://ketabishop.com/api/getCity/",
  getProvince: "https://ketabishop.com/api/getProvince/",

  /* login */
  OTP: "https://ketabika.com/v1/otp/",
  VERIFY: "https://ketabika.com/v1/verify/",

  /* from local json */
  getstatic: "https://ketabishop.com/api/getstatic/",
  getShippingPrice: "https://ketabishop.com/api/getstatic/",
  getUserBasket: "https://ketabishop.com/api/getstatic/",

  
} as const;
