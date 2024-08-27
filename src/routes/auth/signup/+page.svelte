<script lang="ts">
  import ErrorText from '$lib/components/ErrorText.svelte'
  import FormButton from '$lib/components/FormButton.svelte'
  import Input from '$lib/components/Input.svelte'
  import type { PageData } from './$types'
  import { superForm } from 'sveltekit-superforms'

  export let data: PageData

  const { form, enhance, errors, submitting, allErrors } = superForm(data.form)

  $: canSubmit = $form.email && $form.password && $form.passwordConfirmation

  $: internalErrors = $allErrors
    .filter((error) => error.path === '_errors')
    .map((error) => error.messages.join(', '))
    .join(', ')
</script>

<form method="POST" class="flex w-fit flex-col items-center gap-4" use:enhance>
  <h1 class="text-2xl font-bold">Sign Up</h1>
  <Input
    name="email"
    label="Email"
    type="email"
    placeholder="isaac@withpluto.com"
    bind:value={$form.email}
    errors={$errors.email}
  />

  <Input
    name="password"
    label="Password"
    type="password"
    placeholder="••••••••"
    bind:value={$form.password}
    errors={$errors.password}
  />

  <Input
    name="passwordConfirmation"
    label="Confirm Password"
    type="password"
    placeholder="••••••••"
    bind:value={$form.passwordConfirmation}
    errors={$errors.passwordConfirmation}
  />

  <FormButton
    text="Sign Up"
    disabled={!canSubmit}
    submitting={$submitting}
    variant="primary"
  />

  <ErrorText text={internalErrors} />

  <p class="text-sm">Or <a href="/auth/login" class="underline">log in</a></p>
</form>
