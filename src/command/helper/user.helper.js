// adminPrompt.js
import { userPrompt } from '../../admin-panel/prompts/user.prompt.js';
import { User } from '../../db/index.js';
import { hashPassword } from '../../libs/crypto.js';
import { show, showError } from '../../libs/log.js';


export async function resetAdminPassword() {

    show('Resetting admin user password')

    try {
        const admin = await User.findOneAndUpdate({ username }, {
            password: await hashPassword('admin')
        })

        if (admin?._id) {
            return showError('Internal error ocurred')
        }

        show('Admin password has been changed!')
        show('Now try to login using admin:admin')

    } catch (error) {
        showError(error?.message)
    }
};





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


