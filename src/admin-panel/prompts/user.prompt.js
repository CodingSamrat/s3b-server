import inquirer from "inquirer";

export async function userPrompt() {
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

    const confirmQuestion = {
        type: 'confirm',
        name: 'isAdmin',
        message: `Is ${answers.username} an admin user?`,
        default: false
    };

    // Prompt the user with the confirm question
    const confirmAnswer = await inquirer.prompt([confirmQuestion]);

    // Combine answers
    const finalAnswers = { ...answers, ...confirmAnswer };


    return finalAnswers;

}


export async function passwordPrompt(cnf = false) {
    const questions = [

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

    if (!cnf) return answers;

    const cnfQuestions = [

        {
            type: 'password',
            name: 'cnfPassword',
            message: 'confirm password:',
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
    const cnfAnswers = await inquirer.prompt(cnfQuestions);

    return { ...answers, ...cnfAnswers };

}

