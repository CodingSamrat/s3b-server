import readline from 'readline';


export async function takeInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    return new Promise((resolve) => {
        rl.stdoutMuted = true;

        rl.question(prompt, (input) => {
            rl.history = rl.history.slice(1);
            rl.close();
            resolve(input);
        });

    });
}

export async function takePasswordInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    return new Promise((resolve) => {
        rl.stdoutMuted = true;

        rl.question(prompt, (password) => {
            rl.history = rl.history.slice(1);
            rl.close();
            resolve(password);
        });

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMuted) rl.output.write("*");
            else rl.output.write(stringToWrite);
        };
    });
}