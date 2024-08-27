<script lang="ts" context="module">
  export const panelClasses =
    'overflow-hidden rounded-2xl border-[1px] border-gray-100 bg-white text-left'
</script>

<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  let classes = ''
  export { classes as class }
  export let role: HTMLDivElement['role'] | undefined = undefined
  export let style = ''

  export let clientHeight: number | undefined = undefined
  export let clientWidth: number | undefined = undefined
</script>

<div
  class={twMerge(panelClasses, classes)}
  {role}
  bind:clientWidth
  bind:clientHeight
  {style}
>
  <slot />
</div>
