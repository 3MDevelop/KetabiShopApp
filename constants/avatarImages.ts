// src/constants/avatarImages.ts
export const AVATAR_LIST = [
  "https://ketabishop.com/static/app/images/icons/profile/1778673288.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673853.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673865.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778674220.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778674225.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778674230.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778674278.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673233.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673784.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673323.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673802.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673217.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673779.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673836.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673269.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778673790.png",
  "https://ketabishop.com/static/app/images/icons/profile/1778674207.png",
];

export function getAvatarUri(avatar?: number | string | null) {
  const index = Number(avatar);
  if (!Number.isFinite(index) || index < 1) return undefined;
  return AVATAR_LIST[index - 1];
}
