import { createDirectus, rest, createCollection, createField, createRelation, staticToken } from '@directus/sdk';

const url = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_TOKEN;
if (!url || !token) {
  console.error('Set DIRECTUS_URL and DIRECTUS_TOKEN env vars first.');
  process.exit(1);
}
const client = createDirectus(url).with(staticToken(token)).with(rest());

async function ensureCollection(collection, schema, fields = []) {
  try {
    await client.request(createCollection({
      collection,
      meta: { icon: 'box', note: null, display_template: null, hidden: false, singleton: false },
      schema
    }));
    for (const f of fields) await client.request(createField(collection, f));
    console.log(`✔ collection ${collection}`);
  } catch (e) {
    if (String(e).includes('already exists')) console.log(`↺ ${collection} exists`);
    else throw e;
  }
}

async function ensureRelation(rel) {
  try {
    await client.request(createRelation(rel));
    console.log(`✔ relation ${rel.many_collection}.${rel.many_field} → ${rel.one_collection}`);
  } catch (e) {
    if (String(e).includes('already exists')) console.log('↺ relation exists');
    else throw e;
  }
}

(async () => {
  // site_settings (singleton table)
  await ensureCollection('site_settings', { name: 'site_settings' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true }, meta: { interface: 'input' } },
    { field: 'site_name', type: 'string', schema: { length: 255 }, meta: { interface: 'input' } },
    { field: 'default_title', type: 'string', schema: { length: 255 } },
    { field: 'default_description', type: 'text' },
    { field: 'whatsapp', type: 'string', schema: { length: 50 } },
    { field: 'og_image', type: 'uuid', meta: { interface: 'file' } }
  ]);

  // pages
  await ensureCollection('pages', { name: 'pages' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'title', type: 'string', schema: { length: 255 } },
    { field: 'slug', type: 'string', schema: { length: 255 } },
    { field: 'status', type: 'string', schema: { length: 20 }, meta: { options: { choices: ['draft','published'] } } },
    { field: 'seo_title', type: 'string', schema: { length: 255 } },
    { field: 'seo_description', type: 'text' },
    { field: 'published_at', type: 'datetime' }
  ]);

  // blocks tables (per type)
  await ensureCollection('block_hero', { name: 'block_hero' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'eyebrow', type: 'string', schema: { length: 120 } },
    { field: 'heading', type: 'string', schema: { length: 255 } },
    { field: 'text', type: 'text' },
    { field: 'image', type: 'uuid', meta: { interface: 'file' } },
    { field: 'cta_label', type: 'string', schema: { length: 120 } },
    { field: 'cta_url', type: 'string', schema: { length: 255 } }
  ]);

  await ensureCollection('block_rich_text', { name: 'block_rich_text' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'body', type: 'text', meta: { interface: 'wysiwyg' } }
  ]);

  await ensureCollection('block_grid', { name: 'block_grid' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'columns', type: 'integer' }
  ]);
  await ensureCollection('block_grid_item', { name: 'block_grid_item' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'grid', type: 'uuid' },
    { field: 'title', type: 'string', schema: { length: 120 } },
    { field: 'text', type: 'text' },
    { field: 'icon', type: 'string', schema: { length: 80 } }
  ]);
  await ensureRelation({
    many_collection: 'block_grid_item',
    many_field: 'grid',
    one_collection: 'block_grid',
    one_field: 'items'
  });

  await ensureCollection('block_cta', { name: 'block_cta' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'heading', type: 'string', schema: { length: 255 } },
    { field: 'text', type: 'text' },
    { field: 'cta_label', type: 'string', schema: { length: 120 } },
    { field: 'cta_url', type: 'string', schema: { length: 255 } }
  ]);

  // page_blocks (join rows for page sections)
  await ensureCollection('page_blocks', { name: 'page_blocks' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'page', type: 'uuid' },
    { field: 'sort', type: 'integer' },
    { field: 'type', type: 'string', schema: { length: 50 } },
    { field: 'hero', type: 'uuid' },
    { field: 'rich_text', type: 'uuid' },
    { field: 'grid', type: 'uuid' },
    { field: 'cta', type: 'uuid' }
  ]);

  // relations for page_blocks
  await ensureRelation({ many_collection: 'page_blocks', many_field: 'page', one_collection: 'pages', one_field: 'blocks' });
  await ensureRelation({ many_collection: 'page_blocks', many_field: 'hero', one_collection: 'block_hero', one_field: null });
  await ensureRelation({ many_collection: 'page_blocks', many_field: 'rich_text', one_collection: 'block_rich_text', one_field: null });
  await ensureRelation({ many_collection: 'page_blocks', many_field: 'grid', one_collection: 'block_grid', one_field: null });
  await ensureRelation({ many_collection: 'page_blocks', many_field: 'cta', one_collection: 'block_cta', one_field: null });

  // posts (MVP)
  await ensureCollection('authors', { name: 'authors' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'name', type: 'string', schema: { length: 120 } },
    { field: 'avatar', type: 'uuid', meta: { interface: 'file' } }
  ]);
  await ensureCollection('posts', { name: 'posts' }, [
    { field: 'id', type: 'uuid', schema: { is_primary_key: true } },
    { field: 'status', type: 'string', schema: { length: 20 }, meta: { options: { choices: ['draft','published'] } } },
    { field: 'title', type: 'string', schema: { length: 255 } },
    { field: 'slug', type: 'string', schema: { length: 255 } },
    { field: 'excerpt', type: 'text' },
    { field: 'body', type: 'text', meta: { interface: 'wysiwyg' } },
    { field: 'cover', type: 'uuid', meta: { interface: 'file' } },
    { field: 'author', type: 'uuid' },
    { field: 'published_at', type: 'datetime' }
  ]);
  await ensureRelation({ many_collection: 'posts', many_field: 'author', one_collection: 'authors', one_field: 'posts' });

  console.log('All done!');
})();
