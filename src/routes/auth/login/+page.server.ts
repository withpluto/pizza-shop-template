import { fail, setError, superValidate } from 'sveltekit-superforms'
import type { Actions, PageServerLoad } from './$types'
import { zod } from 'sveltekit-superforms/adapters'
import { loginFormSchema } from '$lib/forms'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(loginFormSchema))
  return { form }
}

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(loginFormSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password,
    })

    if (signInError) {
      console.error('Error signing in', signInError)
      return setError(form, signInError.message)
    }

    redirect(303, '/')
  },
}
