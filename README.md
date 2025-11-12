# 📁 dirsy

> A simple, **cross-platform** folder picker for Node.js — works on Windows, macOS, and Linux.

> Provides a native **GUI** folder picker across Windows, macOS, and Linux.

> **zero-dependency**
---

### 🚀 Install
```bash
npm install dirsy
```

### 🧠 Use in Code
```js
const dirsy = require("dirsy");

(async () => {
  const folder = await dirsy.folder("Pick a folder");
  console.log("Selected:", folder);
})();
```

### 💻 Use from CLI
```bash
npx dirsy
```

#### Options
| Flag | Description |
|------|--------------|
| `--title "<text>"` | Custom picker title |
| `--quiet` | Suppress logs/emojis |
| `--raw` | Output only the folder path |
| `--help` | Show help message |

---

## 🆕 v1.1.0 — Import Fix & Refactor

### 🧩 Overview
This update fixes the import issue from earlier versions (v1.0.0) and completely refactors **dirsy** for the future.  
It’s now clean, modular, and works both as a **CLI tool** and a **library import** — no more syntax errors!  

---

### 🛠️ What's Fixed
- 🧰 **Import support restored:**  
  You can now safely use  
  ```js
  const dirsy = require("dirsy");
  const folder = await dirsy.folder("Select a folder");
  ```  
  (no more `SyntaxError: Invalid or unexpected token`!)
- 🖥️ CLI (`npx dirsy`) continues to work perfectly.  
- 🪟 Cross-platform stability improved for Windows, macOS, and Linux.  

---

### ✨ What's New
- Split project into modular files:
  - `index.js` → main export  
  - `cli.js` → CLI runner  
  - `pickers/folder.js` → folder picker logic  
- Added support for future features:
  - `dirsy.folder()` → pick folders  
  - `dirsy.file()` → coming soon 
- Clean flag system:
  - `--title "<text>"` custom prompt title  
  - `--quiet` silent mode  
  - `--raw` raw output  
  - `--help` help menu  
- Polished code: more readable, minimal, and consistent async/await.

---

### 📦 Migration
No breaking changes.  
All old imports still work:
```js
const selectFolder = require("dirsy");
const folder = await selectFolder("Pick a folder");
```

New recommended syntax:
```js
const dirsy = require("dirsy");
const folder = await dirsy.folder("Pick a folder");
```

---

### 🪶 License
MIT © 2025 Inverseitf — Made with ❤️
