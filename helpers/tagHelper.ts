function getUniqueTags(tags: Tag[][], isAi: boolean): string[] {
  // Extract unique tags from the 'en' field
  const uniqueTags = Array.from(
    new Set(tags.flatMap((tags) => tags.map((tag) => tag.tag.en)))
  );
  const updatedTags = uniqueTags.slice(0, isAi ? 47 : 50); // not more than 50 images
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
