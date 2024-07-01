import { DATA_PATH } from "../../../s3b.config.js";
import fs from 'fs'
import path from 'path'
import ApiManager from "./apiManager.js";
import { showError } from "../../libs/log.js";


export async function loginUser(username, password) {
    if (!username || !password) {
        return showError('Credential missing')
    }
    try {
        const { data } = await ApiManager.post('/auth/login', { username, password })

        const aut = data.accessToken
        if (aut) {
            fs.writeFileSync(_getAutPath(), aut)
        }
        return { success: true }
    } catch (error) {
        showError(error?.response?.data?.error)
        return { success: false }
    }

}




export async function logoutUser() {
    try {
        if (fs.existsSync(_getAutPath())) {
            fs.unlinkSync(_getAutPath())
            return true
        }
    } catch (error) {
        showError(error?.message)
        return false
    }

}


export async function isAuth() {
    try {
        if (fs.existsSync(_getAutPath())) {
            const { data } = await ApiManager.get('/auth/current')
            if (data?.user?._id) {
                return true
            }
        } else {
            return false
        }
    } catch (error) {
        showError(error?.response?.data?.error)
    }

}




export async function _getAccessToken() {

    if (await fs.existsSync(_getAutPath())) {
        const token = await fs.readFileSync(_getAutPath(), 'utf-8')
        return token
    } else {
        return 0
    }
}


export async function _setAccessToken(token) {
    await fs.writeFileSync(_getAutPath(), token)
}

function _getAutPath() {
    const fileName = '.s3b.aut'
    const autPath = path.join(DATA_PATH, fileName) // authenticated user token
    return autPath
}