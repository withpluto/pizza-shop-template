import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signupFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })

export const orderFormSchema = z.object({
  size_id: z.string().uuid(),
  topping_ids: z.array(z.string().uuid()),
  topping_quantities: z.array(z.number()),
  special_notes: z.string().optional(),
})
