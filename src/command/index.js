#!/usr/bin/env node
import CLI from '../libs/cli.js'
import { addUser } from './commands/add-user.js';
import adminPanel from './commands/admin-panel.js';
import keyGen from './commands/key-gen.js';

const cli = new CLI('s3b-server');


cli.command('adduser', 'Create an user', addUser);
cli.command('admin', 'admin cli dashboard', adminPanel);
cli.command('keygen', 'Generate secret key for jwt', keyGen);

// Parse the command-line arguments
cli.parse(process.argv);