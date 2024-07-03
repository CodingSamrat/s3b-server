#!/usr/bin/env node
import CLI from '../libs/cli.js'
import { resetAdminPassword, } from './helper/user.helper.js';
import keyGen from './helper/key-gen.js';
import AdminPanel from '../admin-panel/index.js';

const cmd = new CLI('s3b');



cmd.command('reset-admin', 'Reset the admin password', resetAdminPassword);
cmd.command('admin <username>', 'login to cli admin panel', AdminPanel);
cmd.command('keygen', 'Generate secret key for jwt', keyGen);

// Parse the command-line arguments
cmd.parse(process.argv);



