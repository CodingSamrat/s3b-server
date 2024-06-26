import inquirer from 'inquirer';
import { CliHomeRoute } from './home.route.js';
import { createUser, deleteUser, getAllUsers } from '../helper/user.js';
import { takeInput, takePasswordInput } from '../helper/input.js';


export async function CliUserRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> List', value: 'list' },
                { name: '> Add user', value: 'add' },
                { name: '> Back', value: 'back' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'list':
            async function userList() {
                let allUser = await getAllUsers()

                if (allUser.length <= 0) {
                    console.log('User List Empty ----------------------')
                    console.log('You don\'t have any user. Create Now\n')
                }
                else {
                    let myChoices = []

                    await allUser.map(async (user, i) => {
                        await myChoices.push({ name: ` @ ${user.username}${user.isAdmin ? '*' : ''} - ${user.fullName}`, value: user._id })
                    })

                    const answers = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'action',
                            message: 'Select user to get details',
                            choices: [
                                ...myChoices,
                                { name: '> Back', value: 'back' },
                                { name: '> Exit', value: 'exit' }
                            ],
                        }
                    ]);


                    for (let i = 0; i < allUser.length; i++) {
                        const user = allUser[i];


                        if (answers.action === user._id) {
                            console.log()
                            console.log(`--------------------- - - - ---------------------`)
                            console.log('Name     :', user.fullName)
                            console.log('Username :', user.username)
                            console.log('Email    :', user.email)
                            console.log('Mobile   :', user.mobile)
                            console.log('Admin    :', user.isAdmin)
                            console.log(`--------------------- - - - ---------------------\n`)

                            const answers = await inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'action',
                                    message: 'What would you like to do?',
                                    choices: [
                                        { name: '> Delete', value: 'delete' },
                                        { name: '> Back', value: 'back' },
                                        { name: '> Exit', value: 'exit' }
                                    ],
                                }
                            ]);

                            switch (answers.action) {
                                case 'delete':
                                    console.log('')
                                    console.log('----------------------------------------------------')
                                    console.log('                       DANGER                       ')
                                    console.log('  ⚠︎  Think again! You can\'t restore this change  ⚠︎ ')
                                    console.log('----------------------------------------------------')

                                    const yn = await takeInput('Really want to delete? [y/n]> ')
                                    if (yn.toLowerCase() !== 'y') {
                                        await userList()
                                    }


                                    // ...
                                    console.log('')
                                    console.log('----------------------------------------------------')
                                    console.log('             ⚠︎  Confirm to Delete User ⚠︎            ')
                                    console.log('          Write bellow line to delete user          ')
                                    console.log('                        DELETE                      ')
                                    console.log('----------------------------------------------------')

                                    const text = await takeInput(' Write [DELETE]> ')

                                    if (text === 'DELETE') {
                                        const res = await deleteUser(user._id)
                                        console.log(res.message, `@${res.user.username}`)
                                        console.log()

                                        await userList()
                                    } else {
                                        console.log('Wrong Input! Try again')
                                        await userList()
                                    }

                                    break;
                                case 'back':
                                    await userList()
                                    break;
                                case 'exit':
                                    console.log('Goodbye!\n');
                                    process.exit();
                            }
                        }
                        else if (answers.action === 'back') {
                            await CliUserRoute()
                        }
                        else if (answers.action === 'exit') {
                            console.log('Goodbye!\n');
                            process.exit();
                        }
                    }

                }
            }

            await userList()
            break;
        case 'add':
            console.log('Enter user details ---------------------')
            let username = await takeInput('Username: ')
            let password = await takePasswordInput('Password: ')
            let fullName = await takeInput('Full Name: ')
            let email = await takeInput('email: ')
            let mobile = await takeInput('mobile: ')
            let isAdmin = await takeInput('isAdmin [y/n]: ')
            isAdmin = isAdmin.toLowerCase() === 'y'

            const payload = {
                username,
                fullName,
                password,
                email,
                mobile,
                isAdmin
            }


            const yn = await takeInput('Confirm to add new user? [y/n]> ')
            if (yn.toLowerCase() !== 'y') {
                await userList()
            }


            const res = await createUser(payload)
            console.log(res.message)
            break;
        case 'back':
            await CliHomeRoute()
            break;
        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await CliUserRoute();
};



async function CliUserListRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> list', value: 'user' },
                { name: '> Back', value: 'back' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'user':


            break;
        case 'user':


            break;
        case 'back':
            await CliUserRoute()
            break;
        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await CliUserRoute();
};