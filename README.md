# JS的陰曹地府

> A VSCode extension that turns innocent arithmetic into the darkest JavaScript imaginable.  
> For memes, chaos, and code reviewers you don't like. ☠️

---

## 😈 What It Does

Transforms this:

```js
let num = 1 + 2 * 3;
```

Into this:

```js
function cursedAdd(𝓪, 𝓫) {
  return [+𝓪].map(𝕩 => 𝓫 + 𝕩)[0] ^ 0;
}
function cursedMul(𝓪, 𝓫) {
  return [...Array(Number(𝓫) || 0).keys()].reduce(
    (💣𝓪𝓬𝓬) => cursedAdd(💣𝓪𝓬𝓬, 𝓪),
    0
  );
}
let num = cursedAdd(1, cursedMul(2, 3));
```

---

## 📦 Installation

### Option 1: Install via `.vsix` (Manual)

1. Clone or download this repository
2. Run the following in the extension root directory:

```bash
npm install
npm install -g @vscode/vsce
vsce package
```

3. Install the generated `.vsix` in VSCode:

```bash
code --install-extension vscode-cursedify-0.0.1.vsix
```

4. Reload VSCode

---

## 💡 Usage

1. Open any `.js` file in VSCode
2. Press `Ctrl+Shift+P`
3. Search for `Cursedify Current File`
4. Bask in horror

---

## ⚠️ Disclaimer

This extension is **not** intended for production use.  
It is a chaotic art piece. A warning. A joke. A curse.

Use it to confuse your friends, sabotage your past self, or just marvel at how bad things can get.

---

## ✨ Future Ideas

- Support for TypeScript 🤡
- Obfuscating variable names into emoji and Base64
- Log every operation to a ghost log
- Add a setting to randomly replace `+` with `-`, `*`, or `cursedSleep`

---

## 🧛‍♂️ License

**WTFPL** – Do What the F*** You Want to Public License  
Created by Shine  
Built with love, madness, and `eval()`.
