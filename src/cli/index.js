import { CliHomeRoute } from "./route/home.route.js";
import { isAuth, loginUser } from "./helper/authentication.js";
import userPrompt from "./prompts/user.prompt.js";
import { show, showError } from '../libs/log.js'

// Entry point of the dashboard
export default async function AdminPanel() {
    // check login
    try {
        if (await isAuth()) {
            await CliHomeRoute()
        }
        else {
            console.log('\n 🗝️  Login to s3b admin panel')

            // Show prompt 
            const { password, username } = await userPrompt()

            // Authenticate user
            const res = await loginUser(username, password)

            if (res?.success) {
                await CliHomeRoute()
            } else {
                showError('Loging failed')
            }

            // re
        }
    } catch (error) {
        console.log(error)
    }
}




