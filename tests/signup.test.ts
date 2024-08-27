import type { Database } from '../src/lib/database'
import { withSupawright } from 'supawright'

const test = withSupawright<Database, 'public'>(['public'], {})

function randomString(length: number) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

test('can signup', async ({ page }) => {
  await page.goto('/auth/signup')
  await page.fill('input[name="email"]', `${randomString(10)}@example.com`)
  const password = randomString(10)
  await page.fill('input[name="password"]', password)
  await page.fill('input[name="passwordConfirmation"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL('/', { timeout: 3000 })
})
