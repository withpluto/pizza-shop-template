<script lang="ts">
  import type { Icon } from '@withpluto/heroicons-svelte'
  import { twMerge } from 'tailwind-merge'

  type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

  const variantToClass: Record<ButtonVariant, string> = {
    primary:
      'text-white bg-slate-600 hover:bg-slate-500 focus-visible:ring-iris-purple-600/50',
    secondary:
      'text-slate-600 bg-powder-purple-100 hover:bg-powder-purple-200 focus-visible:ring-iris-purple-300/50',
    tertiary:
      'text-slate-600 bg-transparent hover:bg-iris-purple-100 focus-visible:ring-iris-purple-200 focus-visible:ring-2',
  }

  const variantToDisabledClass: Record<ButtonVariant, string> = {
    primary: '!bg-gray-400',
    secondary: 'text-white !bg-gray-300',
    tertiary: 'text-gray-600 !bg-transparent',
  }

  function getButtonClasses({
    variant,
    disabled,
    classes,
  }: {
    variant: ButtonVariant
    disabled: boolean
    classes: string
  }): string {
    return twMerge(
      'flex flex-row flex-nowrap items-center justify-center gap-2',
      'rounded-full min-w-fit w-full select-none',
      'text-base leading-5 font-medium whitespace-nowrap',
      'focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-4',
      'transition-all duration-200 ease-in-out',
      'active:scale-95 active:duration-100',
      'px-4 py-3',
      variantToClass[variant],
      disabled && variantToDisabledClass[variant],
      disabled && 'active:scale-100 cursor-not-allowed',
      classes,
    )
  }

  export let text: string
  export let icon: Icon | null = null
  export let type: 'submit' | 'button' | 'reset' = 'button'
  export let disabled = false
  export let variant: ButtonVariant = 'primary'
  let classes = ''
  export { classes as class }
</script>

<button {type} class={getButtonClasses({ variant, disabled, classes })} {disabled}>
  {#if icon}
    <svelte:component this={icon} />
  {:else}
    <slot />
  {/if}
  {text}
</button>
