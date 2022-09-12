// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {sanityClient} from '../../sanity'
import { Comment, CommentBody } from '../../typing'
import {groq} from 'next-sanity'


type Data =  {
  message:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: CommentBody =JSON.parse(req.body)

  const mutation = {
    mutations:[
      {
        create:{
          _type:"comment",
          comment:data.comment,
          username:data.username,
          profileImg:data.profileImg,
          tweet:{
            _type:'reference',
            _ref:comment.tweetId
          }
        }
      }
    ]
  }
  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  const result = await fetch(apiEndpoint,{
    headers:{
      'content-type':'application/json'
      'Authorization' : `Bearer ${process.env.SANITY_API_Token}`
    },
    body:JSON.stringfy(mutation),
    method:'POST'
  })

  const json = await result.json();

  res.status(200).json(message:"Added")
}
