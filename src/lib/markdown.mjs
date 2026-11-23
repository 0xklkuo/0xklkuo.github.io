function collectText(node) {
  if (!node || typeof node !== 'object') {
    return '';
  }

  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(collectText).join(' ');
  }

  return '';
}

export function estimateReadingTime(text, wordsPerMinute = 200) {
  const words = String(text).trim().split(/\s+/u).filter(Boolean).length;

  if (words === 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function externalLinksRehypePlugin({ site }) {
  const siteOrigin = new URL(site).origin;

  return function transform(node) {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      const url =
        typeof href === 'string' && URL.canParse(href, site) ? new URL(href, site) : undefined;

      if (url && ['http:', 'https:'].includes(url.protocol) && url.origin !== siteOrigin) {
        const rel = node.properties.rel;
        const tokens = Array.isArray(rel) ? rel : typeof rel === 'string' ? rel.split(/\s+/u) : [];

        node.properties.target = '_blank';
        node.properties.rel = [...new Set([...tokens, 'noopener', 'noreferrer'])];
      }
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(transform);
    }
  };
}

export function readingTimeRemarkPlugin() {
  return function (tree, file) {
    const readingTime = estimateReadingTime(collectText(tree));

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.readingTime = readingTime;
  };
}
