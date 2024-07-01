import { User } from "../db/index.js";
import { hashPassword } from "./crypto.js";


export async function createAdminUser() {
    const allUser = await User.find()
    const rootUser = await User.findOne({ username: 'root' })


    if (rootUser) return


    for (let i = 0; i < allUser.length; i++) {
        const eUser = allUser[i];

        if (eUser.username === 'root') {
            return
        }
    }


    const user = await User.create({
        username: 'root',
        password: await hashPassword('toor')
    })


    console.log('> Created admin user', user.username),
        console.log('> username:root')
    console.log('> password:toor\n')

}
