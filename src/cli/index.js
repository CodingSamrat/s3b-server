import { CliHomeRoute } from "./route/home.route.js";
import { isAuth, loginUser, promptLogin } from "./helper/authentication.js";



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
            const { password, username } = await promptLogin()
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




