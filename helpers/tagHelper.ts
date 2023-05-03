const generativeAiTags = ['Generative AI', 'Generative', 'AI'];
const maxTags = 49;

interface Tag {
  confidence: number;
  tag: {
    en: string;
  };
}

function getUniqueTags(
  tags: Tag[][],
  previousTags: string[],
  isAi: boolean
): string[] {
  const flatTags = tags.flatMap((tags) => tags.map((tag) => tag.tag.en));
  let uniqueTags: Set<string>;
  if (previousTags.length) {
    uniqueTags = new Set<string>(previousTags);
    generativeAiTags.forEach((tag) => uniqueTags.delete(tag));
    flatTags.forEach((tag) => uniqueTags.add(tag));
  } else {
    uniqueTags = new Set(flatTags);
  }
  const updatedTags = [...uniqueTags].slice(
    0,
    isAi ? maxTags - generativeAiTags.length : maxTags
  ); // not more than maxTags tags

  return isAi ? updatedTags.concat(generativeAiTags) : updatedTags;
}

export type { Tag };
export { getUniqueTags };
