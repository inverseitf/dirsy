const { spawn, spawnSync } = require("child_process");
const readline = require("readline");

async function selectFile(title = "Select a file", options = {}) {
  const { extensions = [] } = options;
  const platform = process.platform;

  try {
    switch (platform) {
      case "win32": return await pickWindows(title, extensions);
      case "darwin": return pickMac(title, extensions);
      case "linux": return await pickLinux(title, extensions);
      default: return await cliPrompt(title, extensions);
    }
  } catch {
    return await cliPrompt(title, extensions);
  }
}

// ---------------- Windows ----------------
function pickWindows(title, ext) {
  const filter = ext.length
    ? `${ext.map(e => "*." + e).join(";")}`
    : "*.*";

  return new Promise((resolve, reject) => {
    const ps = spawn("powershell.exe", [
      "-NoProfile",
      "-Command",
      `
      Add-Type -AssemblyName System.Windows.Forms;
      $ofd = New-Object System.Windows.Forms.OpenFileDialog;
      $ofd.Title = '${title}';
      $ofd.Filter = 'Files (${filter})|${filter}';
      if ($ofd.ShowDialog() -eq 'OK') { $ofd.FileName }
      `
    ]);

    let output = "";
    ps.stdout.on("data", d => (output += d));
    ps.on("error", reject);
    ps.on("close", () => resolve(output.trim() || null));
  });
}

// ---------------- macOS ----------------
function pickMac(title, ext) {
  let typePart = "";

  if (ext.length) {
    const types = ext.map(e => `"${e}"`).join(", ");
    typePart = `of type {${types}}`;
  }

  const script = `choose file ${typePart} with prompt "${title}"`;

  const { stdout } = spawnSync("osascript", ["-e", script], {
    encoding: "utf-8",
  });

  return stdout.trim() || null;
}

// ---------------- Linux ----------------
async function pickLinux(title, ext) {
  const trySpawn = (cmd, args) => {
    try {
      const { stdout } = spawnSync(cmd, args, { encoding: "utf-8" });
      return stdout.trim() || null;
    } catch {
      return null;
    }
  };

  const filters = ext.length
    ? [`--file-filter=${ext.map(e => "*." + e).join(" ")}`]
    : [];

  return (
    trySpawn("zenity", ["--file-selection", "--title", title, ...filters]) ||
    trySpawn("kdialog", ["--getopenfilename", ".", ...filters, "--title", title]) ||
    (await cliPrompt(title, ext))
  );
}

// ---------------- CLI fallback ----------------
function cliPrompt(title, ext) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const extText = ext.length ? ` (extensions: ${ext.join(", ")})` : "";
    rl.question(`${title}${extText}: `, (answer) => {
      rl.close();
      resolve(answer.trim() || null);
    });
  });
}

module.exports = selectFile;
