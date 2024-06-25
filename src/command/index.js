#!/usr/bin/env node
import CLI from '../libs/cli.js'
import createAdmin from './commands/create-admin.js';

const cli = new CLI('s3b-server');


cli.command('create-admin-user', 'Create an admin user', createAdmin);

// Parse the command-line arguments
cli.parse(process.argv);