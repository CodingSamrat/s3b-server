import inquirer from 'inquirer';
import { addUser, getAllUser, removeUser } from '../helper/user.js';
import { showError } from '../../libs/log.js';
import { CliHomeRoute } from './home.route.js';
import { getCurrentUser } from '../constant.js';

export async function CliUserRoute() {
    let allUser = await getAllUser()

    if (!allUser || allUser?.length <= 0) {
        console.log('\n\n------------ User List Empty -----------')
        console.log('         You don\'t have any user\n')


    }


    else {
        try {
            let myChoices = []

            await allUser?.map(async (user, i) => {
                const username = user.username.padEnd(15, ' ');
                await myChoices.push({ name: `${i + 1}. ${username} ${user.isAdmin ? '[admin]' : ''}`, value: user._id })
            })

            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Select user to get details',
                    choices: [
                        ...myChoices,
                        { name: '> Add User', value: 'add' },
                        { name: '> Remove User', value: 'remove' },
                        { name: '> Back', value: 'back' },
                        { name: '> Exit', value: 'exit' }
                    ],
                }
            ]);

            switch (answers.action) {
                case 'add':
                    if (!(await getCurrentUser()).isAdmin) {
                        showError('Only admin can add/remove user')
                    }
                    await addUser()
                    await CliUserRoute()
                    break;
                //


                case 'remove':
                    if (!(await getCurrentUser()).isAdmin) {
                        showError('Only admin can add/remove user')
                    }
                    await removeUser()
                    await CliUserRoute()
                    break;
                //


                case 'back':
                    await CliHomeRoute()
                    break;
                //


                case 'remove':
                    console.log('Goodbye!\n');
                    process.exit();
                //

            }

        } catch (error) {
            showError(error?.message)
        }



    }



}
