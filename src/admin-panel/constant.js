import { DATA_PATH } from "../../s3b.config.js"
import { showError } from "../libs/log.js"
import path from 'path'
import fs from 'fs'

export let DEV_MODE = true
export let CURRENT_USER = await getCurrentUser()

export async function SetCurrentUser(user) {
    try {
        const fileName = '.c-user.json'
        const cUserPath = path.join(DATA_PATH, fileName)
        await fs.writeFileSync(cUserPath, JSON.stringify(user, null, 2))

    } catch (error) {

    }

}

export async function getCurrentUser() {
    const fileName = '.c-user.json'
    const cUserPath = path.join(DATA_PATH, fileName)

    try {
        if (await fs.existsSync(cUserPath)) {
            const user = await fs.readFileSync(cUserPath,)
            return JSON.parse(user)
        } else {
            return 0
        }
    } catch (error) {
        showError(error?.message)
    }
}

