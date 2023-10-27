import type { PageServerLoad } from './$types'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../convex/_generated/api.js'
import { PUBLIC_CONVEX_URL } from '$env/static/public'

console.log('PUBLIC_CONVEX_URL: ', PUBLIC_CONVEX_URL)

export const load = (async () => {
  const client = new ConvexHttpClient(PUBLIC_CONVEX_URL)

  client.query(api.tasks.get).then(console.log)

  return {}
}) satisfies PageServerLoad
