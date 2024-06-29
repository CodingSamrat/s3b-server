// adminPrompt.js
import userPrompt from '../../cli/prompts/user.prompt.js';
import { User } from '../../db/index.js';
import { hashPassword } from '../../libs/crypto.js';
import { show, showError } from '../../libs/log.js';


export async function addUser() {


    console.log('\n👤 Add new user ')

    const { username, password } = await userPrompt()
    try {
        const existingUser = await User.findOne({ username })

        if (existingUser?._id) {
            return console.error('\nERROR: Username already exist!')
        }

        const user = await User.create({
            username,
            password: await hashPassword(password),
        })


        if (user?._id) {
            show(`Admin user '${username}' created successfully!`);
        } else {
            showError('Some error occured!');
        }


    } catch (error) {
        showError(error?.message)
    }
};


