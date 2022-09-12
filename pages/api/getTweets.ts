// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {sanityClient} from '../../sanity'
import { Tweet } from '../../typing'
import {groq} from 'next-sanity'

const fetchQuery = groq`
  *[ _type == "tweet" && !blocktweet ]{
    _id,
    ...
  } | order(_createdAt desc)

`
type Data =  Tweet[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets:Tweet[] = await sanityClient.fetch(fetchQuery)
  res.status(200).json(tweets)
}
