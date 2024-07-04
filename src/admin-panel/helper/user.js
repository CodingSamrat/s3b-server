// adminPrompt.js
import inquirer from 'inquirer';
import { userPrompt } from '../../admin-panel/prompts/user.prompt.js';
import { User } from '../../db/index.js';
import { hashPassword } from '../../libs/crypto.js';
import { show, showError } from '../../libs/log.js';


export async function getAllUser() {
    try {
        const users = await User.find()
        return users
    } catch (error) {
        showError(error?.message)
    }
}




export async function addUser() {

    console.log('\n👤 Add new user ')

    const { username, password, isAdmin } = await userPrompt()


    try {
        const existingUser = await User.findOne({ username })

        if (existingUser?._id) {
            return showError('Username already exist!')
        }

        const user = await User.create({
            username,
            isAdmin,
            password: await hashPassword(password),
        })


        if (user?._id) {
            show(`user '${username}' created successfully!`);
        } else {
            showError('Some error occurred!');
        }


    } catch (error) {
        showError(error?.message)
    }
};






export async function removeUser() {

    try {

        const answers = await inquirer.prompt(
            [
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
            ]
        );

        if (answers.username === 'admin') {
            return showError('admin user can\'t be deleted.')
        }

        // Prompt the user with the questions
        const deletedUser = await User.deleteOne({ username: answers.username })

        if (deletedUser?._id) {
            show('User removed!')
        }

    } catch (error) {
        showError(error?.message)
    }
};

