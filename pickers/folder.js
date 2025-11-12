const { spawn, spawnSync } = require("child_process");
const readline = require("readline");

async function selectFolder(title = "Select a folder") {
  const platform = process.platform;
  try {
    switch (platform) {
      case "win32": return await pickWindows(title);
      case "darwin": return pickMac(title);
      case "linux": return await pickLinux(title);
      default: return await cliPrompt(title);
    }
  } catch {
    return await cliPrompt(title);
  }
}

function pickWindows(title) {
  return new Promise((resolve, reject) => {
    const ps = spawn("powershell.exe", [
      "-NoProfile",
      "-Command",
      `$f = (New-Object -ComObject Shell.Application).BrowseForFolder(0, '${title}', 0);
       if ($f) { $f.Self.Path }`
    ]);
    let output = "";
    ps.stdout.on("data", (d) => (output += d));
    ps.on("error", reject);
    ps.on("close", () => resolve(output.trim() || null));
  });
}

function pickMac(title) {
  const script = `choose folder with prompt "${title}"`;
  const { stdout } = spawnSync("osascript", ["-e", script], { encoding: "utf-8" });
  return stdout.trim() || null;
}

async function pickLinux(title) {
  const trySpawn = (cmd, args) => {
    try {
      const { stdout } = spawnSync(cmd, args, { encoding: "utf-8" });
      return stdout.trim() || null;
    } catch {
      return null;
    }
  };

  return (
    trySpawn("zenity", ["--file-selection", "--directory", "--title", title]) ||
    trySpawn("kdialog", ["--getexistingdirectory", ".", "--title", title]) ||
    (await cliPrompt(title))
  );
}

function cliPrompt(title = "Enter folder path manually") {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`${title}: `, (answer) => {
      rl.close();
      resolve(answer.trim() || null);
    });
  });
}

module.exports = selectFolder;
