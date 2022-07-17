export const makeHashtags = (text: string) => {
  const rawTags = text.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w-]+/g) || [];
  const noSharpTags = rawTags.map((tag) =>
    tag
      .split('')
      .filter((s) => s !== '#')
      .join('')
  );
  return noSharpTags.map((tag: string) => ({
    where: { tag },
    create: { tag },
  }));
};
