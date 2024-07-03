import { CliHomeRoute } from "./route/home.route.js";
import { hasAccess, loginUser } from "./helper/auth.js";
import { showError } from '../libs/log.js'
import { CURRENT_USER } from "./constant.js";

// Entry point of the dashboard
export default async function AdminPanel({ username }) {
    // check login
    try {
        if (await hasAccess()) {
            await CliHomeRoute()
        }
        else {

            const authConfirm = await loginUser(username)

            if (authConfirm) {
                await CliHomeRoute()
            } else {
                showError('Login failed!')
            }



            // ...
        }
    } catch (error) {
        console.log(error)
    }
}





