import {
  createSocialPreviewImage,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
} from "@/lib/socialPreviewImage";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_CONTENT_TYPE;

export default function OpenGraphImage() {
  return createSocialPreviewImage();
}
