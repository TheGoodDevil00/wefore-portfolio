// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'daxm1morz', // Your Cloudinary cloud name
};

// Helper function to get Cloudinary video URL
export const getCloudinaryVideoUrl = (publicId: string, options?: {
  quality?: 'auto' | 'best' | 'good' | 'eco' | 'low';
  format?: 'auto' | 'mp4' | 'webm';
  width?: number;
  height?: number;
}) => {
  const { quality = 'auto', format = 'auto', width, height } = options || {};
  
  const transformationParts = [`q_${quality}`, `f_${format}`];
  
  if (width) transformationParts.push(`w_${width}`);
  if (height) transformationParts.push(`h_${height}`);
  if (width && height) transformationParts.push('c_limit'); // Prevent upscaling

  const transformationString = transformationParts.join(',');
  
  // Appending .mp4 extension helps browsers identify the resource type
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/${transformationString}/${publicId}.mp4`;
};

// Helper function to get Cloudinary video thumbnail
export const getCloudinaryThumbnail = (publicId: string, options?: {
  width?: number;
  height?: number;
}) => {
  const { width = 400, height = 400 } = options || {};
  
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/so_0,w_${width},h_${height},c_fill,q_auto,f_jpg/${publicId}.jpg`;
};
