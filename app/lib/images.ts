// Auto-generated image manifest categorized by aspect ratio

export interface ImageData {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
}

export const landscapeImages: ImageData[] = [
  { src: '/images/landscape-4-3/05DFFB5A-A0D8-42D5-8EA6-E8ECB910CAC0.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/funny1.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/funny2.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/funny3.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/group1.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/group2.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/group3.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/group4.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0716.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0720.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0737.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0743.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0744.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0765.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0773.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0864.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0902.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0905.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0910.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_0958.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_1161.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_1209.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_1216.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_1243.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
  { src: '/images/landscape-4-3/IMG_1261.webp', width: 4032, height: 3024, aspectRatio: 1.33 },
];

export const portraitImages: ImageData[] = [
  { src: '/images/portrait-3-4/benadryl.webp', width: 3024, height: 4032, aspectRatio: 0.75 },
  { src: '/images/portrait-3-4/cooked_bens.webp', width: 3024, height: 4032, aspectRatio: 0.75 },
  { src: '/images/portrait-3-4/IMG_5580.webp', width: 2316, height: 3088, aspectRatio: 0.75 },
  { src: '/images/portrait-3-4/IMG_8714.webp', width: 3024, height: 4032, aspectRatio: 0.75 },
  { src: '/images/portrait-3-4/shivani.webp', width: 3024, height: 4032, aspectRatio: 0.75 },
];

export const allImages: ImageData[] = [...landscapeImages, ...portraitImages];

// Helper to get a random image from a category
export const getRandomLandscape = (): ImageData => 
  landscapeImages[Math.floor(Math.random() * landscapeImages.length)];

export const getRandomPortrait = (): ImageData => 
  portraitImages[Math.floor(Math.random() * portraitImages.length)];

// Helper to shuffle an array
export const shuffleImages = (images: ImageData[]): ImageData[] => 
  [...images].sort(() => Math.random() - 0.5);
