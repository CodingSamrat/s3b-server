import inquirer from 'inquirer';
import { show, showError } from '../../libs/log.js';
import { CliBucketRoute } from './bucket.route.js';
import { createBucket } from '../helper/bucket.js';
import { createBucketPrompt } from '../prompts/bucket.prompt.js';
import AdminPanel from '../index.js';
import { logoutUser, updatePassword } from '../helper/auth.js';
import { CliUserRoute } from './user.route.js';


export async function CliHomeRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> List Bucket', value: 'b_list' },
                { name: '> Create Bucket', value: 'b_create' },
                { name: '> User', value: 'user' },
                { name: '> Update Password', value: 'update-pass' },
                { name: '> Logout', value: 'logout' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'b_list':
            // go to bucket route
            await CliBucketRoute()

            // Run home route recursively
            await CliHomeRoute()
            break;
        //


        case 'b_create':
            // Show prompt to take bucket name
            const { name } = await createBucketPrompt()

            // create bucket
            const res = await createBucket(name)

            // Check response
            if (res?.message) {
                show(res?.message)
                console.log('')

                // Run home route recursively
                await CliHomeRoute()
            }
            if (res?.error) {
                showError(res?.error)
                console.log('')

                // Run home route recursively
                await CliHomeRoute()
            }

            break;
        //



        case 'user':
            await CliUserRoute()

            // Run home route recursively
            await CliHomeRoute()
            break
        //


        case 'update-pass':
            await updatePassword()

            // Run home route recursively
            await CliHomeRoute()
            break
        //



        case 'logout':
            const isDone = await logoutUser()
            if (isDone) {
                show('Successfully logged out')
            }
            process.exit();
        //

        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await CliHomeRoute();
};