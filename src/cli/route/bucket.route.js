import inquirer from 'inquirer';
import { logoutUser } from '../helper/authentication.js';
import AdminPanel from '../index.js';
import { CliHomeRoute } from './home.route.js';
import { createBucket, getAllBucket } from '../helper/bucket.js';
import { takeInput } from '../helper/input.js';


export async function CliBucketRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> List', value: 'list' },
                { name: '> Create', value: 'create' },
                { name: '> Delete', value: 'delete' },
                { name: '> Back', value: 'back' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'list':
            async function bucketList() {
                let allBucket = await getAllBucket()

                if (allBucket.length <= 0) {
                    console.log('Bucket List Empty')
                    console.log('You don\'t have any bucket. Create Now\n')
                }
                else {
                    let myChoices = []

                    await allBucket.map(async (bucket, i) => {
                        await myChoices.push({ name: `${i + 1}. ${bucket.projectName} - ${bucket.bucketId}`, value: bucket.bucketId })
                    })

                    const answers = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'action',
                            message: 'Select bucket to get details',
                            choices: [
                                ...myChoices,
                                { name: '> Back', value: 'back' },
                                { name: '> Exit', value: 'exit' }
                            ],
                        }
                    ]);


                    for (let i = 0; i < allBucket.length; i++) {
                        const bucket = allBucket[i];


                        if (answers.action === bucket.bucketId) {
                            console.log()
                            console.log(bucket.projectName.toUpperCase())
                            console.log(`--------------------- - - - ---------------------`)
                            console.log('bucketId  :', bucket.bucketId)
                            console.log('apiKey    :', bucket.apiKey)
                            console.log('apiSecret :', bucket.apiSecret)
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
                                    console.log('                       DANGER                       ')
                                    console.log('----------------------------------------------------')
                                    console.log('  ⚠︎  Think again! You can\'t restore this change  ⚠︎ ')
                                    console.log('----------------------------------------------------')

                                    const answers = await inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'action',
                                            message: 'Do you really want to delete bucket?',
                                            choices: [
                                                { name: '> No', value: 'no' },
                                                { name: '> Yes', value: 'yes' },
                                            ],
                                        }
                                    ]);

                                    if (answers.action === 'no') {
                                        await bucketList()
                                    }


                                    // ...
                                    console.log('')
                                    console.log('              Confirm to Delete Bucket              ')
                                    console.log('----------------------------------------------------')
                                    console.log('  ⚠︎       Write bellow line to delete bucket      ⚠︎ ')
                                    console.log('  ⚠︎                DELETE MY BUCKET               ⚠︎ ')
                                    console.log('  ⚠︎  Think again! You can\'t restore this change  ⚠︎ ')
                                    console.log('----------------------------------------------------')

                                    const text = await takeInput(' > ')

                                    if (text === 'DELETE MY BUCKET') {
                                        console.log('delete bucket', bucket._id)

                                        await bucketList()
                                    } else {
                                        console.log('Wrong Input! Try again')
                                        await bucketList()
                                    }

                                    break;
                                case 'back':
                                    await bucketList()
                                    break;
                                case 'exit':
                                    console.log('Goodbye!\n');
                                    process.exit();
                            }
                        }
                        else if (answers.action === 'back') {
                            await CliBucketRoute()
                        }
                        else if (answers.action === 'exit') {
                            console.log('Goodbye!\n');
                            process.exit();
                        }
                    }

                }
            }

            await bucketList()
            break;
        case 'create':
            const projectName = await takeInput('Project Name: ')
            const res = await createBucket(projectName)
            console.log(res)
            break;
        case 'delete':


            break;
        case 'back':
            await CliHomeRoute()
            break;
        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await CliBucketRoute();
};



async function CliBucketListRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> list', value: 'bucket' },
                { name: '> Back', value: 'back' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'bucket':


            break;
        case 'user':


            break;
        case 'back':
            await CliBucketRoute()
            break;
        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await CliBucketRoute();
};