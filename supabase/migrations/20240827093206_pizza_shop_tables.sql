-- Pizza size configuration
create table public.pizza_size (
    id uuid primary key default uuid_generate_v4(),
    size text not null,
    num_included_toppings int not null,
    price money not null,
    price_per_additional_topping money not null
);
alter table public.pizza_size enable row level security;
create policy "anyone can read pizza_size"
on public.pizza_size
for select
using (true);

-- Topping configuration
create table public.topping (
    id uuid primary key default uuid_generate_v4(),
    name text not null
);
alter table public.topping enable row level security;
create policy "anyone can read topping"
on public.topping
for select
using (true);

-- Orders
create table public.order (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    user_id uuid not null references auth.users(id),
    -- Useful to track total paid in case prices change
    total_price money not null,
    address text not null,
    special_notes text
);
alter table public.order enable row level security;
create policy "user can read order"
on public.order
for select
using (auth.uid() = user_id);

create policy "user can create order"
on public.order
for insert
with check (auth.uid() = user_id);

-- Pizzas in an order
create table public.pizza (
    id uuid not null default uuid_generate_v4() unique,
    order_id uuid not null references public.order(id),
    size_id uuid not null references public.pizza_size(id),
    primary key (id, order_id, size_id)
);
alter table public.pizza enable row level security;
create policy "user can read pizza"
on public.pizza
for select
using (auth.uid() = order_id);

create policy "user can create pizza"
on public.pizza
for insert
with check (auth.uid() = order_id);

-- Join table for pizza and topping
create table public.pizza_topping (
    id uuid not null default uuid_generate_v4(),
    pizza_id uuid not null references public.pizza(id),
    topping_id uuid not null references public.topping(id),
    quantity int not null,
    primary key (id, pizza_id, topping_id),
    unique (pizza_id, topping_id)
);
alter table public.pizza_topping enable row level security;
create policy "user can read pizza_topping"
on public.pizza_topping
for select
using (auth.uid() = pizza_id);

create policy "user can create pizza_topping"
on public.pizza_topping
for insert
with check (auth.uid() = pizza_id);
