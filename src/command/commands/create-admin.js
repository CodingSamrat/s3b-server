// adminPrompt.js
import readline from 'readline';
import { User } from '../../models/index.js';
import { hashPassword } from '../../libs/crypto.js';

export default () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.log('')
    console.log('Enter user data to create Admin User -------------')
    console.log('N.B. username & password are required field ------')
    console.log('')


    getInfo()
    function getInfo() {
        rl.question('Enter username: ', (username) => {
            rl.question('Enter password: ', (password) => {
                rl.question('Enter full name: ', (fullName) => {
                    rl.question('Enter email: ', (email) => {
                        rl.question('Enter mobile number: ', async (mobile) => {


                            try {

                                if (!username || !password) {
                                    console.log('\nUsername & Password are required!')
                                    getInfo()
                                }
                                else {
                                    rl.close();
                                    await createAdmin({ username, password, fullName, email, mobile });

                                }

                            } catch (error) {
                                console.error('Error creating admin user:', error);
                            }
                        });
                    });
                });
            });
        });
    }
};







async function createAdmin({ username, password, fullName, email, mobile }) {

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