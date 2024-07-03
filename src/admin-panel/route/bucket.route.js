import inquirer from 'inquirer';
import { getAllBucket, deleteBucket } from '../helper/bucket.js';
import { deleteBucketPrompt } from '../prompts/bucket.prompt.js';
import { show, showError } from '../../libs/log.js';
import { CliHomeRoute } from './home.route.js';

export async function CliBucketRoute() {
    let allBucket = await getAllBucket()

    if (!allBucket || allBucket?.length <= 0) {
        console.log('\n\n------------ Bucket List Empty -----------')
        console.log('         You don\'t have any bucket\n')


    }


    else {
        let myChoices = []

        await allBucket?.map(async (bucket, i) => {
            const paddedName = bucket.name.padEnd(15, ' ');
            await myChoices.push({ name: `${i + 1}. ${paddedName} [${bucket.bucketId}]`, value: bucket.bucketId })
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
                console.log(`------------------------------------------`)
                console.log(bucket.name.toUpperCase())
                console.log('bucketId  :', bucket.bucketId)
                console.log('apiKey    :', bucket.apiKey)
                console.log('apiSecret :', bucket.apiSecret)
                console.log(`------------------------------------------\n`)

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
                        const shouldDelete = await deleteBucketPrompt()

                        if (!shouldDelete) await CliBucketRoute()

                        try {
                            const res = await deleteBucket(bucket.bucketId)

                            if (res?.message) {
                                show(res?.message)
                            }
                        } catch (error) {
                            showError(error?.message)
                        }
                        break



                    case 'back':
                        await CliBucketRoute()
                        break

                    case 'exit':
                        console.log('Goodbye!\n');
                        process.exit();
                }
            }
            else if (answers.action === 'back') {
                await CliHomeRoute()
            }
            else if (answers.action === 'exit') {
                console.log('Goodbye!\n');
                process.exit();
            }
        }

    }



}
