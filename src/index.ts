import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import sql from './db.js'

await sql`

create table todo_items (
  id bigint primary key generated always as identity,
  title text not null,
  description text,
  is_completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table users (
  id bigint primary key generated always as identity,
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

create table user_todos (
  id bigint primary key generated always as identity,
  user_id bigint references users (id) on delete cascade,
  todo_id bigint references todo_items (id) on delete cascade
);
`.execute()

const app = new Hono()

app.get('/data', (c) => {
  return c.json({
    data: "testi",
    info: "testiä"
  })
})

app.post('/data', async (c)=> {

  const jsonData = await c.req.json()
  console.log(jsonData)
  return c.json({
    data: "ok",
    info: "ei infoa"
  })

})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
