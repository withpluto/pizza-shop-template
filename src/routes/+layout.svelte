<script lang="ts">
  import '../app.css'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import type { LayoutData } from './$types'
  import Button from '$lib/components/Button.svelte'

  export let data: LayoutData
  $: ({ session, supabase, user } = data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<div class="flex min-h-screen flex-col">
  <nav
    class="border-b-1 flex w-full items-center justify-between border-iris-purple-100 bg-rice-200 p-4 text-slate-600"
  >
    <a href="/" class="text-2xl font-bold">Pizza Shop</a>

    {#if user}
      <a href="/logout" data-sveltekit-preload-data="tap" data-sveltekit-reload>
        <Button variant="tertiary" text="Logout" />
      </a>
    {/if}
  </nav>

  <div
    class="flex flex-grow flex-col items-center justify-start bg-rice-100 p-8 py-12 text-slate-600"
  >
    <main class="flex w-full max-w-screen-lg flex-col items-center">
      <slot />
    </main>
  </div>
</div>
