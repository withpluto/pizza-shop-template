import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  const { data: orders, error: ordersFetchError } = await supabase
    .from('order')
    .select(
      `
      *,
      pizza_size (*),
      order_topping (quantity, topping (name))
    `,
    )
    .order('created_at', { ascending: false })

  if (ordersFetchError) {
    error(500, ordersFetchError.message)
  }
  return { orders, thank: url.searchParams.has('thanks') }
}
