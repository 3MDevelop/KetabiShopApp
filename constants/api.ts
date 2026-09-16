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
  getShippingPrice: "https://ketabishop.com/api/getShippingPrice/",

  /* Basket */
  getUserBasket: "https://ketabishop.com/api/getUserBasket/",
  setUserBasket: "https://ketabishop.com/api/setUserBasket/",

  /* Favorites */
  getUserFavorites: "https://ketabishop.com/api/getUserFavorites/",
  setUserFavorites: "https://ketabishop.com/api/setUserFavorites/",

  /* login */
  OTP: "https://ketabika.com/v1/otp/",
  VERIFY: "https://ketabika.com/v1/verify/",

  /* comments */
  getComments: "https://ketabishop.com/api/getComments/",
  setComment: "https://ketabishop.com/api/setComment/",
  updateComment: "https://ketabishop.com/api/updateComment/",
  getUserComments: "https://ketabishop.com/api/getUserComments/",
  deleteComment: "https://ketabishop.com/api/deleteComment/",

  /* user */
  getUserInfo: "https://ketabishop.com/api/getUserInfo/",
  setUserInfo: "https://ketabishop.com/api/setUserInfo/",

  /* from local json */
  getstatic: "https://ketabishop.com/api/getstatic/",
} as const;
