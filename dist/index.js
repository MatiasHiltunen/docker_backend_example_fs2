import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import sql from './db.js';
async function init() {
    await sql `
    create table if not exists todo_items (
      id bigint primary key generated always as identity,
      title text not null,
      description text,
      is_completed boolean not null default false,
      created_at timestamp with time zone not null default now(),
      updated_at timestamp with time zone not null default now()
    );
  `;
    await sql `create index if not exists idx_todo_items_created_at on todo_items (created_at desc);`;
}
await init();
const app = new Hono();
// Allow cross-origin requests (useful for separate frontend)
app.use('*', cors());
// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));
// List todos
app.get('/todos', async (c) => {
    const rows = await sql `
    select id, title, description, is_completed, created_at, updated_at
    from todo_items
    order by created_at desc
  `;
    return c.json(rows);
});
// Create todo
app.post('/todos', async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const description = typeof body?.description === 'string' ? body.description : null;
    if (!title) {
        return c.json({ error: 'title is required' }, 400);
    }
    const inserted = await sql `
    insert into todo_items (title, description)
    values (${title}, ${description})
    returning id, title, description, is_completed, created_at, updated_at
  `;
    return c.json(inserted[0], 201);
});
// Get one todo
app.get('/todos/:id', async (c) => {
    const { id } = c.req.param();
    const idNum = Number(id);
    if (!Number.isFinite(idNum))
        return c.json({ error: 'invalid id' }, 400);
    const rows = await sql `
    select id, title, description, is_completed, created_at, updated_at
    from todo_items
    where id = ${idNum}
  `;
    if (rows.length === 0)
        return c.json({ error: 'not found' }, 404);
    return c.json(rows[0]);
});
// Update todo (partial)
app.patch('/todos/:id', async (c) => {
    const { id } = c.req.param();
    const idNum = Number(id);
    if (!Number.isFinite(idNum))
        return c.json({ error: 'invalid id' }, 400);
    const body = await c.req.json().catch(() => ({}));
    const title = typeof body?.title === 'string' ? body.title : null;
    const description = typeof body?.description === 'string' ? body.description : null;
    const is_completed = typeof body?.is_completed === 'boolean' ? body.is_completed : null;
    const updated = await sql `
    update todo_items
    set
      title = coalesce(${title}, title),
      description = coalesce(${description}, description),
      is_completed = coalesce(${is_completed}, is_completed),
      updated_at = now()
    where id = ${idNum}
    returning id, title, description, is_completed, created_at, updated_at
  `;
    if (updated.length === 0)
        return c.json({ error: 'not found' }, 404);
    return c.json(updated[0]);
});
// Delete todo
app.delete('/todos/:id', async (c) => {
    const { id } = c.req.param();
    const idNum = Number(id);
    if (!Number.isFinite(idNum))
        return c.json({ error: 'invalid id' }, 400);
    const deleted = await sql `
    delete from todo_items
    where id = ${idNum}
    returning id
  `;
    if (deleted.length === 0)
        return c.json({ error: 'not found' }, 404);
    return c.body(null, 204);
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
