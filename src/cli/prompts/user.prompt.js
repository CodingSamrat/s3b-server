import inquirer from "inquirer";

export default async function userPrompt() {
    // Define the questions for the login form
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: 'username:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username.';
                }
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'password:',
            mask: '*',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password.';
                }
            }
        }
    ];
    // Prompt the user with the questions
    const answers = await inquirer.prompt(questions);
    return answers;

}
