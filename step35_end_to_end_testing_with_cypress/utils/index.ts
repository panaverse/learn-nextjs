export const cutTextToLength = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export const composeArticleSlug = (id: string, title: string) => {
  return `${slugify(title)}-${id}`;
}

export const extractArticleIdFromSlug = (slug: string) => {
  return slug.split('-').pop();
}
