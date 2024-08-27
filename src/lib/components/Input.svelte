<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import ErrorText from './ErrorText.svelte'

  export let name: string
  export let label: string
  export let type: HTMLInputElement['type'] = 'text'
  export let placeholder = ''
  export let value = ''
  export let errors: string[] | undefined = undefined
  let classes = ''
  export { classes as class }
  export let containerClasses = ''
</script>

<div class={twMerge('flex flex-col items-center gap-2', containerClasses)}>
  <label for={name} class="w-full text-left text-sm font-medium text-gray-700"
    >{label}</label
  >
  <input
    {name}
    {...{ type }}
    {placeholder}
    bind:value
    class={twMerge(
      'w-full rounded-md border-2 border-gray-300 p-2 focus-within:border-iris-purple-400',
      classes,
    )}
    id={name}
  />
  <ErrorText text={errors?.join(', ') ?? ''} />
</div>
