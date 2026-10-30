import { themeIds, type ThemeId } from "../../src/themes";

// --theme <قالب>: تجربة قالب تاني من غير ما تغيّر ملف المنتج
export const themeArg = (args: Record<string, string | true>): ThemeId | undefined => {
  const value = args.theme;
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !themeIds.includes(value as ThemeId)) {
    console.log(`--theme لازم يكون واحد من: ${themeIds.join(" | ")}`);
    process.exit(1);
  }
  return value as ThemeId;
};
