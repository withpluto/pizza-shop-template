# Technical Test - Pluto's Pizza Shop

Buongiorno!

Congratulations on passing the first stage of your interview! The next stage is a
technical test, and you’ve been tasked with creating the order page for Pluto’s Pizza
Shop, the most popular pizza joint in all of London.

Pluto’s is famous for its made-to-order pizza, and they've recently expanded into
the world of online delivery. However, Head Chef Floris wants to make sure people
ordering online can easily keep track of where their pizza is on its journey to
their table.

Your task is to extend the functionality of the existing Pluto's Pizza Shop
app to include order tracking. Users should be able to see the status of their
order, and be able to track the progress of their pizza as it moves through the
various stages of its journey.

## Your task

Implement order tracking in the app. Customers should be able to see the status
of their order, when it reached each stage of its journey, and whatever else you
think is relevant.

This is a product-thinking test as much as a technical one, so get creative!

As a side note, you're welcome to make changes to any of the existing code to
implement this functionality. If you see something that doesn't look right, it's
very possible that something's been overlooked in the original design.

Please also implement any end-to-end tests you think are necessary to ensure
your new code is stable and won't be broken by any future changes.

## Getting up and running

Pluto's Pizza Shop uses a stack that mirrors what we use here at Pluto. It's
built with [SvelteKit](https://kit.svelte.dev/), and uses [Supabase](https://supabase.com/)
to manage the database.

Styling is done with [Tailwind](https://tailwindcss.com/), and end-to-end testing
uses [Playwright](https://playwright.dev/) with [Supawright](https://github.com/isaacharrisholt/supawright).

### Prerequisites

- Node.js 18+
- pnpm
- Docker

### Installation

#### 1. Clone the repo

Please make sure to _clone_ the repo, **not** fork it. Since the repo is public, GitHub
will force all forks to be public. This could give other candidates an advantage over
you if they're able to see your code.

We recommend cloning the repo to your local machine, then changing the remote URL
to point to a private repository on GitHub that you own.

```bash
git clone https://github.com/withpluto/pizza-shop-template.git
cd pizza-shop-template
git remote set-url origin git@github.com:your-username/pizza-shop-template.git
```

#### 2. Install dependencies

```bash
pnpm install
```

#### 3. Start the Supabase database

Start the Supabase database with `pnpm db:start`. This may take a while to start the
first time around as Supabase is comprised a number of services.

### Running the app

Once you've installed the dependencies, you can run the app with `pnpm dev`.

You can preview the production build with `pnpm preview`.

Both will automatically read the environment variables from the `.env` file using
`dotenv-cli`.

The `.env` file itself can be created by copying `.env.example` and filling in the
values. These can be found by running the following command once the database is
running:

```bash
pnpm supabase status
```

### Database management

Add a database migration with `pnpm db:migrate <migration_name>`. This will create a new
migration file in the `supabase/migrations` directory.

## Submitting your code

Submit your code by inviting `isaacharrisholt` to your repo (if private), and emailing
`isaac@withpluto.com` with the link to your repo.

Please make sure it's ready before you submit, as any changes you make to the code
after submitting will be rejected.

## Getting help

If you have any questions, please email `floris@withpluto.com`.
