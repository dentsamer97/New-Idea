// يقرأ أوامر زي: --product sink --format short --dry
export const parseArgs = (argv = process.argv.slice(2)) => {
  const args: Record<string, string | true> = {};
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        args[arg.slice(2)] = next;
        i++;
      } else {
        args[arg.slice(2)] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { args, positional };
};

export const str = (v: string | true | undefined) => (typeof v === "string" ? v : undefined);
