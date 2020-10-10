import { NextApiRequest, NextApiResponse } from 'next'
import postmark, { isValidEndpoint } from 'lib/postmark'

export default async function PostmarkAPIRoute(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const {
      body,
      query: { vars },
    } = req
    if (typeof vars === 'string') throw new Error(`Vars should be an array`)
    const [endpoint, id, ...args] = vars
    if (!endpoint || !isValidEndpoint(endpoint))
      throw new Error(
        `Bad Request: ${endpoint} is not a valid Postmark endpoint`,
      )
    const postmarkResponse = await postmark[endpoint](id || body || undefined)
    res.status(200).end(JSON.stringify(postmarkResponse))
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}
