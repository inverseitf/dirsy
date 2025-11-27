# dirsy

dirsy lets you pick a folder or a file using a simple system dialog.  
It has **no dependencies**.  
It first tries native system dialogs. If they fail, it uses a CLI prompt.

## Install
```
npm install dirsy
```

## Use in Code

### Pick a folder
```js
const folder = await dirsy.folder("Select folder");
```

### Pick a file
```js
const file = await dirsy.file("Select file");
```

### Pick a file with allowed extensions
```js
const file = await dirsy.file("Select image", {
  extensions: ["png", "jpg"]
});
```

If you do not give extensions, it allows **all files**.

## CLI
```
npx dirsy
npx dirsy --file
```
