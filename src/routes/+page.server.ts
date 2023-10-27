import type { PageServerLoad } from './$types'
import { json } from '@sveltejs/kit'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../convex/_generated/api.js'
import { PUBLIC_CONVEX_URL } from '$env/static/public'

type Data = {
  success: boolean
  errors: Record<string, string>
}

export const load = (async () => {
  const client = new ConvexHttpClient(PUBLIC_CONVEX_URL)

  client.query(api.tasks.get).then(console.log)

  return {}
}) satisfies PageServerLoad

export async function POST({ request }) {
  const formData = await request.formData()
  const text = String(formData.get('task'))

  const data: Data = {
    success: false,
    errors: {}
  }

  if (!text) {
    return json(data, { status: 400 })
  }

  api
    .addTask({ text })
    .then(() => {
      data.success = true
      return json(data)
    })
    .catch((error) => {
      data.errors = error.errors
      return json(data, { status: 400 })
    })
}
