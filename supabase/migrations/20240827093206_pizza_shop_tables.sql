-- Pizza size configuration
create table public.pizza_size (
    id uuid primary key default uuid_generate_v4(),
    size text not null,
    num_included_toppings int not null,
    price decimal(9,2) not null,
    price_per_additional_topping decimal(9,2) not null
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
    size_id uuid not null references pizza_size(id),
    address text,
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

-- Join table for order and topping
create table public.order_topping (
    id uuid not null default uuid_generate_v4(),
    order_id uuid not null references public.order(id),
    topping_id uuid not null references public.topping(id),
    quantity int not null,
    primary key (id, order_id, topping_id),
    unique (order_id, topping_id)
);
alter table public.order_topping enable row level security;
create policy "user can read order_topping"
on public.order_topping
for select
using (auth.uid() = (
    select user_id
    from public.order
    where id = order_id
));

create policy "user can create order_topping"
on public.order_topping
for insert
with check (auth.uid() = (
    select user_id
    from public.order
    where id = order_id
));
