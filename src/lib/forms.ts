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
