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
    let jsonBody
    console.log(body)
    if (body && typeof body === 'string') jsonBody = JSON.parse(body)
    console.log(`jsonBody`, jsonBody)
    const postmarkResponse = await postmark[endpoint](
      id || jsonBody || undefined,
    )
    res.status(200).send(postmarkResponse)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    res.status(500).send({ error: err.message })
  }
}
