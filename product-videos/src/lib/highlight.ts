const clean = (w: string) => w.replace(/[؟?!.,،]/g, "");

// هل الكلمة دي من الجزء اللي بيتلوّن في الهوك؟
export const isHighlighted = (word: string, highlight: string) =>
  highlight.split(" ").map(clean).includes(clean(word));
