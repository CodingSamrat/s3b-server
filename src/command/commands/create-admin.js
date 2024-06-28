// adminPrompt.js
import { User } from '../../db/index.js';
import { hashPassword } from '../../libs/crypto.js';
import inquirer from 'inquirer';

export default async () => {
    console.log('')
    console.log('Enter user data to create Admin User -------------')
    console.log('N.B. username & password are required field ------')
    console.log('')


    await createAdmin()
};



// Function to prompt for user registration
async function promptRegistration() {
    // Define the questions for the registration form
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: 'Username:',
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
            message: 'Password:',
            mask: '*',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password.';
                }
            }
        },
        {
            type: 'input',
            name: 'fullName',
            message: 'Full name:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email:',
            validate: function (value) {
                // Simple email validation regex
                const pass = value.match(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                );
                if (pass) {
                    return true;
                } else {
                    return 'Please enter a valid email address.';
                }
            }
        },
        {
            type: 'input',
            name: 'mobile',
            message: 'Mobile number:',
            validate: function (value) {
                // Simple mobile number validation to check for digits only
                const pass = value.match(
                    /^\d+$/
                );
                if (pass) {
                    return true;
                } else {
                    return 'Please enter a valid mobile number.';
                }
            }
        }
    ];

    // Prompt the user with the questions
    const answers = await inquirer.prompt(questions);
    return answers;

}




async function createAdmin() {
    const { username, password, fullName, email, mobile } = await promptRegistration()
    try {
        const existingUser = await User.findOne({ username })

        if (existingUser?._id) {
            return console.error('\nERROR: Username already exist!')
        }

        const user = await User.create(
            {
                username,
                password: await hashPassword(password),
                fullName,
                email,
                mobile,
                isAdmin: true
            }
        )

        console.log(`\nAdmin user '${username}' created successfully.`);


    } catch (error) {
        console.log(error.message)
    }
}