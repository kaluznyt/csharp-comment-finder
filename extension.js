// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    let outputChannel = vscode.window.createOutputChannel("csharp-comment-finder");

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "csharp-comment-finder" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    let findCommentsCommand = vscode.commands.registerCommand('extension.findComments', function () {
        outputChannel.clear();

        vscode.workspace.findFiles("**/*.cs").then(files => {
            files.forEach(file => {
                vscode.workspace.openTextDocument(file).then(textDocument => {
                    let fileContent = textDocument.getText();

                    const lineCommentsRegex = /\/\/.*/gm;

                    const lineCommentsFound = fileContent.match(lineCommentsRegex);

                    if (lineCommentsFound) {
                        //console.log(file.fsPath);
                        outputChannel.appendLine("");
                        outputChannel.appendLine(file.fsPath);

                        lineCommentsFound.forEach(lc => {
                            //console.log(lc);
                            outputChannel.appendLine(lc);
                        });
                    }
                })
            })
        })
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(findCommentsCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;