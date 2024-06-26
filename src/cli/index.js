import { CliHomeRoute } from "./route/home.route.js";
import { isAuth, loginUser } from "./helper/authentication.js";

import { takeInput, takePasswordInput } from "./helper/input.js";



// Entry point of the dashboard
export default async function AdminPanel() {
    // check login
    try {
        if (await isAuth()) {
            await CliHomeRoute()
        }
        else {
            console.log("")
            console.log('Login to s3b admin panel-------------------')
            const username = await takeInput('Username: ')
            const password = await takePasswordInput('Password: ')
            console.log('')
            const res = await loginUser(username, password)
            if (res.success) {
                await CliHomeRoute()
            }
        }
    } catch (error) {
        console.log(error)
    }
}




