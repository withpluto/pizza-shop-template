<script lang="ts">
  import type { Icon } from '@withpluto/heroicons-svelte'
  import { ArrowPathSolid20 } from '@withpluto/heroicons-svelte'
  import Button from './Button.svelte'

  export let text: string
  export let disabled = false
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary'
  export let icon: Icon | undefined = undefined
  export let submitting = false
  let classes = ''
  export { classes as class }
</script>

<Button
  type="submit"
  {text}
  disabled={disabled || submitting}
  {variant}
  class={classes}
  icon={!submitting ? icon : undefined}
>
  {#if submitting}
    <span class="animate-spin">
      <ArrowPathSolid20 />
    </span>
  {/if}
</Button>
