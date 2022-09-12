import {createImageUrlBuilder, createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_Token,
}
const builder = imageUrlBuilder(config);
export const sanityClient = createClient(config)

export const urlFor = (source) => builder.image(source);