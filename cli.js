#!/usr/bin/env node
const dirsy = require("./index");

function parseFlags(args) {
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--file") flags.mode = "file";
    else if (arg === "--title") flags.title = args[++i];
    else if (arg === "--quiet") flags.quiet = true;
    else if (arg === "--raw") flags.raw = true;
    else if (arg === "--help") flags.help = true;
  }
  return flags;
}

(async () => {
  const args = process.argv.slice(2);
  const flags = parseFlags(args);

  if (flags.help) {
    console.log(`
dirsy — native picker
Usage: npx dirsy [options]

Options:
  --file             Pick a file (future)
  --title "<text>"   Custom picker title
  --quiet            Suppress logs/emojis
  --raw              Output only the path
  --help             Show help message
`);
    process.exit(0);
  }

  const mode = flags.mode === "file" ? "file" : "folder";
  const picker = mode === "file" ? dirsy.file : dirsy.folder;

  if (!flags.quiet) console.log("📂 Opening picker...");

  const result = await picker(flags.title || `Select a ${mode}`);

  if (flags.raw) console.log(result || "");
  else if (result) console.log(flags.quiet ? result : `📁 Selected: ${result}`);
  else if (!flags.quiet) console.log("❌ No selection.");

  process.exit(result ? 0 : 1);
})();
