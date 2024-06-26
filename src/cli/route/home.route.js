import inquirer from 'inquirer';
import { logoutUser } from '../helper/authentication.js';
import AdminPanel from '../index.js';
import { CliBucketRoute } from './bucket.route.js';


export async function CliHomeRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> Bucket', value: 'bucket' },
                { name: '> User', value: 'user' },
                { name: '> Logout', value: 'logout' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'bucket':
            await CliBucketRoute()

            break;
        case 'user':


            break;
        case 'logout':
            await logoutUser()
            await AdminPanel()
            break;
        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await CliHomeRoute();
};