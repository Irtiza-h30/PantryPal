export const preprocessSummary = (string = "") =>
  `${string
    .split(". ")
    .filter((i) => !i.includes("href"))
    .join(". ")
    .replace("spoonacular", "")
    .replace(/<\/?[^>]+(>|$)/g, "")}.`;
