import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';

function getClient() {
  const url = import.meta.env.DIRECTUS_URL as string | undefined;
  const token = import.meta.env.DIRECTUS_TOKEN as string | undefined;
  if (!url) throw new Error('DIRECTUS_URL is not set');
  const base = token ? createDirectus(url).with(staticToken(token)) : createDirectus(url);
  return base.with(rest());
}

export async function getAllPageSlugs() {
  try {
    const client = getClient();
    const res = await client.request(readItems('pages', {
      fields: ['slug'],
      filter: { status: { _eq: 'published' } },
      limit: -1,
    }));
    return (res as any[]).map((r: any) => r.slug).filter(Boolean);
  } catch {
    return [] as string[];
  }
}

export async function getPageBySlug(slug: string, { draft = false }: { draft?: boolean } = {}) {
  const client = getClient();
  const fields = [
    'id','title','slug','seo_title','seo_description',
    'blocks.sort','blocks.type',
    'blocks.hero.*','blocks.rich_text.*','blocks.grid.*','blocks.cta.*',
    'blocks.grid.items.*'
  ];
  const res = await client.request(readItems('pages', {
    filter: { slug: { _eq: slug }, ...(draft ? {} : { status: { _eq: 'published' } }) },
    fields, limit: 1
  }));
  return (res as any[])?.[0] ?? null;
}

export async function getPostSlugs() {
  const client = getClient();
  return client.request(readItems('posts', {
    fields: ['slug'], filter: { status: { _eq: 'published' } }
  }));
}

export async function getPostBySlug(slug: string) {
  const client = getClient();
  const res = await client.request(readItems('posts', {
    filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
    fields: ['title','slug','excerpt','body','cover','author.name','published_at'],
    limit: 1
  }));
  return (res as any[])?.[0] ?? null;
}

export async function getSiteSettings() {
  const client = getClient();
  const res = await client.request(readItems('site_settings', { limit: 1 }));
  return (res as any[])?.[0] ?? null;
}
