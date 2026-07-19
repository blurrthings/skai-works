import { placeholderImage } from "@/lib/placeholder-image";

const CLOUDINARY_VIDEO_URLS = [
  "https://res.cloudinary.com/odyopj47/video/upload/v1783862497/Betaab_Hoon_Dil_Chahe_Zaada_Last_Hope_Church-Modify_zwixpu.mp4",
  "https://res.cloudinary.com/odyopj47/video/upload/v1783862486/Nitrro_Thane_East_hvukig.mp4",
  "https://res.cloudinary.com/odyopj47/video/upload/v1783862445/Starbuck_Mix_Event_uks3eh.mp4",
  "https://res.cloudinary.com/odyopj47/video/upload/v1783862437/True_Element_mriw4k.mp4",
  "https://res.cloudinary.com/odyopj47/video/upload/v1783862404/Active_Armour_joejdj.mp4",
  "https://res.cloudinary.com/odyopj47/video/upload/v1783862367/Panatta_dpj8hq.mp4"
  // "/videos/Betaab Hoon.webm"
];

export const heroSlides = [
  {
    title: "Videography Footages",
    seed: "viewfinder-hero-1",
    video: CLOUDINARY_VIDEO_URLS[0],
  },
] as const;

export const videographySlides = CLOUDINARY_VIDEO_URLS.map((video, i) => ({
  id: i + 1,
  video,
}));

export function heroImage(seed: string) {
  return placeholderImage(seed, 1200, 720);
}
