<script lang="ts">
  import Panel from '$lib/components/Panel.svelte'
  import PanelRadio from '$lib/components/PanelRadio.svelte'
  import { MinusCircleSolid16, PlusCircleSolid16 } from '@withpluto/heroicons-svelte'
  import type { PageData } from './$types'
  import { superForm } from 'sveltekit-superforms'
  import Input from '$lib/components/Input.svelte'
  import FormButton from '$lib/components/FormButton.svelte'
  import ErrorText from '$lib/components/ErrorText.svelte'

  export let data: PageData

  const { form, enhance, errors, submitting, allErrors } = superForm(data.form)

  let sizeId: string
  const toppings = data.toppings.map((topping) => {
    return {
      id: topping.id,
      name: topping.name,
      quantity: 0,
    }
  })

  $: selectedSize = data.pizzaSizes.find((size) => size.id === sizeId)
  $: selectedToppings = toppings.filter((topping) => topping.quantity > 0)
  $: totalToppings = selectedToppings.reduce(
    (acc, topping) => acc + topping.quantity,
    0,
  )

  let price: number | null = null
  $: if (selectedSize) {
    price =
      (selectedSize.price as number) +
      (selectedSize.price_per_additional_topping as number) *
        Math.max(0, totalToppings - selectedSize.num_included_toppings)
  } else {
    price = null
  }

  $: internalErrors = $allErrors
    .filter((error) => error.path === '_errors')
    .map((error) => error.messages.join(', '))
    .join(', ')
</script>

<div class="flex w-full flex-col items-center gap-6">
  <h1 class="text-2xl font-bold">Pluto's Pizza Shop</h1>

  <Panel class="flex w-full flex-col gap-6 p-6">
    <h2 class="text-xl font-bold">Select your size</h2>

    <div class="grid gap-4 md:grid-cols-2">
      {#each data.pizzaSizes as size}
        <PanelRadio
          name="size"
          value={size.id}
          bind:group={sizeId}
          class="flex flex-col gap-2"
        >
          <h3 class="font-bold">{size.size}</h3>
          <p class="text-sm font-semibold">£{size.price}</p>
          <p class="text-sm text-gray-700">
            Includes {size.num_included_toppings} toppings
          </p>
          <p class="text-sm text-gray-700">
            £{size.price_per_additional_topping} per extra topping
          </p>
        </PanelRadio>
      {/each}
    </div>
  </Panel>

  <Panel class="flex w-full flex-col gap-6 p-6">
    <h2 class="text-xl font-bold">Select your toppings</h2>

    <div class="grid gap-4 md:grid-cols-2">
      {#each toppings as topping}
        <div class="flex flex-col gap-2">
          <p class="text-sm font-semibold">{topping.name}</p>
          <div class="flex flex-row items-center gap-2">
            <button
              on:click={() => {
                if (topping.quantity === 0) return
                topping.quantity--
              }}
              class:text-gray-300={topping.quantity === 0}
              data-testid="{topping.name.toLowerCase()}-minus"
            >
              <MinusCircleSolid16 />
            </button>
            <p class="w-3 text-center text-sm font-semibold">{topping.quantity}</p>
            <button
              on:click={() => {
                if (topping.quantity === 5) return
                topping.quantity++
              }}
              class:text-gray-300={topping.quantity === 5}
              data-testid="{topping.name.toLowerCase()}-plus"
            >
              <PlusCircleSolid16 />
            </button>
          </div>
        </div>
      {/each}
    </div>
  </Panel>

  <Panel class="flex w-full flex-col gap-6 p-6">
    <h2 class="text-xl font-bold">Summary</h2>

    {#if price === null}
      <p class="text-sm text-gray-500">Please select a size</p>
    {:else}
      <form method="POST" class="flex flex-col gap-4" use:enhance>
        <p class="text-2xl font-bold">Price: £{price.toFixed(2)}</p>
        <input type="hidden" name="size_id" value={sizeId} />
        {#each selectedToppings as topping}
          <input type="hidden" name="topping_ids" value={topping.id} />
          <input type="hidden" name="topping_quantities" value={topping.quantity} />
        {/each}
        <Input
          name="special_notes"
          label="Special notes"
          type="text"
          bind:value={$form.special_notes}
          errors={$errors.special_notes}
        />
        <FormButton
          text="Place Order"
          disabled={!selectedSize}
          submitting={$submitting}
          variant="primary"
        />

        <ErrorText text={internalErrors} />
      </form>
    {/if}
  </Panel>
</div>
