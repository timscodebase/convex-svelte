<script lang="ts">
  import { invalidateAll } from '$app/navigation'

  type Data = {
    success: boolean
    errors: Record<string, string>
  }

  export let data

  let form: Data

  async function addTask(event: Event) {
    const formEl = event.target as HTMLFormElement
    const data = new FormData(formEl)

    // you can see everything about the form
    console.dir(form)

    const response = await fetch(formEl.action, {
      method: 'POST',
      body: data
    })
    const responseData = await response.json()

    // { success: true, errors: {} } object
    form = responseData

    // reset form
    formEl.reset()

    // rerun `load` function for the page
    await invalidateAll()
  }
</script>

<h1>Welcome to SvelteKit + Convex</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form method="POST" action="?/addTask">
  <input type="text" name="text" placeholder="Add a task" />
  <button type="submit">Add</button>
</form>

<style>
</style>
