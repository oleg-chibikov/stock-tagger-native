function getUniqueTags(
  tags: Tag[][],
  extraTags: string[],
  isAi: boolean
): string[] {
  // Extract unique tags from the 'en' field
  const uniqueTags = Array.from(
    new Set(tags.flatMap((tags) => tags.map((tag) => tag.tag.en)))
  );
  const maxTags = 49;
  const updatedTags = [...extraTags, ...uniqueTags].slice(
    0,
    isAi ? maxTags - 3 : maxTags
  ); // not more than 50 images
  if (isAi) {
    updatedTags.push('Generative AI');
    updatedTags.push('Generative');
    updatedTags.push('AI');
  }
  return updatedTags;
}

interface Tag {
  confidence: number;
  tag: {
    en: string;
  };
}

export type { Tag };
export { getUniqueTags };
