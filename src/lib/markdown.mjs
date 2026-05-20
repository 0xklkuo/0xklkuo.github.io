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

export function readingTimeRemarkPlugin() {
  return function (tree, file) {
    const readingTime = estimateReadingTime(collectText(tree));

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.readingTime = readingTime;
  };
}
