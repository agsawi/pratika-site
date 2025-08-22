export function buildTitle(pageTitle?: string, siteTitle?: string) {
  if (pageTitle && siteTitle) return `${pageTitle} | ${siteTitle}`;
  return pageTitle || siteTitle || '';
}

export function buildDescription(desc?: string, fallback?: string) {
  return desc || fallback || '';
}

