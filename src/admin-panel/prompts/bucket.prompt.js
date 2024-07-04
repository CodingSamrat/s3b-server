import inquirer from "inquirer";
import { show } from "../../libs/log.js";

export async function createBucketPrompt() {
    console.log('\n ⚠︎  Enter Bucket name carefully.')
    console.log(' ⚠︎  Bucket name can\'t be changed.')
    // Define the questions for the login form
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter Bucket Name:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Bucket name is require.';
                }
            }
        }

    ];


    const answers = await inquirer.prompt(questions);
    return answers;

}
export async function deleteBucketPrompt() {

    console.log('')
    console.log('⚠︎  Do you really want to delete bucket')
    console.log("'''''''''''''''''''''''''''''''''''''''''''''''")

    const questions = [
        {
            type: 'confirm',
            name: 'confirmAction',
            message: 'Do you want to proceed?',
            default: false
        },
        {
            type: 'input',
            name: 'delete',
            message: 'Type DELETE:',
            when: function (answers) {
                return answers.confirmAction;
            }
        }
    ];

    const answers = await inquirer.prompt(questions);

    if (answers.delete !== 'DELETE') show(`Type DELETE to confirm. You entered '${answers.delete}'\n`)

    return answers.confirmAction && answers.delete === 'DELETE';

}
