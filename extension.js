const vscode = require("vscode");
const recast = require("recast");
const b = recast.types.builders;

function isNumericLiteral(node) {
  return node.type === "Literal" && typeof node.value === "number";
}

function transformMath(code) {
  const ast = recast.parse(code);

  recast.visit(ast, {
    visitBinaryExpression(path) {
      const { node } = path;
      if (
        ["+", "-", "*", "/", "**"].includes(node.operator) &&
        (isNumericLiteral(node.left) || isNumericLiteral(node.right))
      ) {
        const fnMap = {
          "+": "cursedAdd",
          "-": "cursedSub",
          "*": "cursedMul",
          "/": "cursedDiv",
          "**": "cursedPow"
        };
        const callee = b.identifier(fnMap[node.operator]);
        const newNode = b.callExpression(callee, [node.left, node.right]);
        path.replace(newNode);
      }
      this.traverse(path);
    }
  });

  const transformedCode = recast.print(ast).code;

  const cursedFns = `function cursedAdd(𝓪, 𝓫) {
  return [+𝓪].map(𝕩 => 𝓫 + 𝕩)[0] ^ 0;
}

function cursedSub(𝓪, 𝓫) {
  return JSON.parse(JSON.stringify(new Set([𝓪 - 𝓫]).values().next().value));
}

function cursedMul(𝓪, 𝓫) {
  return [...Array(Number(𝓫) || 0).keys()].reduce(
    (💣𝓪𝓬𝓬) => cursedAdd(💣𝓪𝓬𝓬, 𝓪),
    0
  );
}

function cursedDiv(𝓪, 𝓫) {
  if (𝓫 === 0) throw new Error("Divided by cursed zero");
  return eval(Buffer.from(Buffer.from(\`\${ 𝓪 }/\${ 𝓫 }\`).toString("base64"), "base64").toString());
}

function cursedPow(𝓪, 𝓫) {
  return Array.from({ length: 𝓫 }, () => 𝓪).reduce((💥, 𝓿) => cursedMul(💥, 𝓿), 1);
}

function cursedSleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

`;

  return cursedFns + transformedCode;
}

function activate(context) {
  console.log("Cursedify extension activated!");

  let disposable = vscode.commands.registerCommand("cursedify.run", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const doc = editor.document;
    const code = doc.getText();
    const transformed = transformMath(code);

    const fullRange = new vscode.Range(
      doc.positionAt(0),
      doc.positionAt(code.length)
    );

    editor.edit((editBuilder) => {
      editBuilder.replace(fullRange, transformed);
    });
  });

  context.subscriptions.push(disposable);
}

exports.activate = activate;
function deactivate() {}
exports.deactivate = deactivate;
