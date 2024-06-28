export default class CLI {
    constructor(projectName) {
        this.projectName = projectName
        this.commands = {};
        this.middlewares = [];
    }

    command(command, description, handler) {
        const [cmdName, ...args] = command.split(' ');
        this.commands[cmdName] = { description, handler, args };
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    help() {
        console.log(`Usage: ${this.projectName} 'command'\n`);
        console.log('Commands:');
        for (const command in this.commands) {
            const { description, args } = this.commands[command];
            const argsDisplay = args.join(' ');
            console.log(`  ${command} ${argsDisplay}: ${description}`);
        }
    }

    async runMiddlewares(argv) {
        for (const middleware of this.middlewares) {
            await new Promise((resolve, reject) => {
                middleware(argv, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }
    }

    async parse(argv) {
        const command = argv[2];
        if (!command || command === '--help' || command === '-h') {
            this.help();
            return;
        }

        const cmd = this.commands[command];
        if (cmd) {
            const parsedArgs = this.parseArgs(argv.slice(3), cmd.args);
            if (parsedArgs.error) {
                console.error(parsedArgs.error);
                this.help();
                return;
            }

            try {
                await this.runMiddlewares(argv);
                await cmd.handler(parsedArgs.args);
            } catch (err) {
                console.error('Error in middleware:', err);
            }
        } else {
            console.log(`Unknown command: ${command}`);
            this.help();
        }
    }

    parseArgs(argv, args) {
        const parsedArgs = {};
        let argIndex = 0;

        for (const arg of args) {
            const argName = arg.replace(/[<>[\]]/g, '');
            if (arg.startsWith('<')) {
                if (argv[argIndex] === undefined) {
                    return { error: `Missing required argument: ${argName}` };
                }
                parsedArgs[argName] = argv[argIndex];
            } else if (arg.startsWith('[')) {
                parsedArgs[argName] = argv[argIndex];
            }
            argIndex++;
        }

        return { args: parsedArgs };
    }
}