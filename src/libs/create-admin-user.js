import { User } from "../db/index.js";
import { hashPassword } from "./crypto.js";
import { show } from "./log.js";


(async function () {
    const allUser = await User.find()
    const uname = 'admin'


    for (let i = 0; i < allUser.length; i++) {
        const eUser = allUser[i];

        if (eUser.username === uname) {
            return
        }
    }


    const user = await User.create({
        username: uname,
        isAdmin: true,
        password: await hashPassword(uname)
    })


    // show('Admin User Created!', user)

})()
