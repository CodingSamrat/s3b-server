// adminPrompt.js
import { userPrompt } from '../../admin-panel/prompts/user.prompt.js';
import { User } from '../../db/index.js';
import { hashPassword } from '../../libs/crypto.js';
import { show, showError } from '../../libs/log.js';





export async function addUser() {

    console.log('\n👤 Add new user ')

    const { username, password, isAdmin } = await userPrompt()


    try {
        const existingUser = await User.findOne({ username })

        if (existingUser?._id) {
            return showError('\nUsername already exist!')
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






export async function removeUser({ username }) {

    try {
        console.log(username)

    } catch (error) {
        showError(error?.message)
    }
};

