<script lang="ts">
  import Panel from '$lib/components/Panel.svelte'
  import { twMerge } from 'tailwind-merge'

  type T = $$Generic

  export let name: string
  export let value: T
  export let group: T
  export let disabled = false
  let classes = ''
  export { classes as class }
  export let containerClasses = ''
</script>

<label
  class={twMerge(
    'h-full w-full',
    !disabled ? 'cursor-pointer' : 'cursor-not-allowed',
    containerClasses,
  )}
>
  <input
    type="radio"
    bind:group
    {value}
    class="peer hidden"
    id="{name}-{String(value)}"
    {name}
    {disabled}
  />
  <Panel
    class={twMerge(
      'p-4 transition-all duration-150 ease-in-out',
      'peer-enabled:hover:shadow-[0_4px_4px_rgba(0,0,0,0.05)]',
      disabled ? 'bg-gray-200 text-gray-500' : '',
      value === group ? 'border-iris-purple-400' : '',
      classes,
    )}
  >
    <slot />
  </Panel>
</label>
