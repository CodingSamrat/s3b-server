#!/usr/bin/env node
import CLI from '../libs/cli.js'
import createAdmin from './commands/create-admin.js';
import adminPanel from './commands/admin-panel.js';

const cli = new CLI('s3b-server');


cli.command('create-admin-user', 'Create an admin user', createAdmin);
cli.command('admin', 'admin cli dashboard', adminPanel);

// Parse the command-line arguments
cli.parse(process.argv);