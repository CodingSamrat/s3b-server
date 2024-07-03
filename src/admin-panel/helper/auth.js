import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, DATA_PATH } from "../../../s3b.config.js";
import fs from 'fs'
import path from 'path'
import { User } from "../../db/index.js"
import { comparePassword } from "../../libs/crypto.js"
import { showError } from "../../libs/log.js"
import { SetCurrentUser } from "../constant.js"
import { passwordPrompt } from "../prompts/user.prompt.js"
import jwt from 'jsonwebtoken'

export async function loginUser(username) {
    console.log('\n 🗝️  Enter password for user -', username)
    const { password } = await passwordPrompt()

    if (!username || !password) {
        return showError('Invalid Credential!')
    }

    const user = await User.findOne({ username })

    if (!user._id) {
        return showError('No user found!')
    }

    // console.log(password, user.password)
    // TODO: Check Password
    let isSuccess = false
    try {
        if (!(await comparePassword(password, user.password))) {
            return showError('Invalid password')
        }



        isSuccess = true
    } catch (error) {
        isSuccess = false
        showError(error.message)
    }


    // ... 
    if (isSuccess) {

        // Generate access token
        const payload = {
            username
        }

        const accessToken = await jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })


        if (accessToken) {
            await fs.writeFileSync(_getAutPath(), accessToken)
        }

        SetCurrentUser(user)
        return true
    }
    else {
        showError('Login Failed!')
        return false
    }
}


export async function hasAccess() {
    if (!fs.existsSync(_getAutPath())) return false
    const token = await fs.readFileSync(_getAutPath(), 'utf-8')


    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ username: decoded?.username })
        if (user?._id) {
            return true
        }
    } catch (error) {
        console.log()
        if (error?.message === 'jwt expired') {
            console.log('⚠︎  Session expired!')
        } else {
            showError(error?.message)

        }
        return false
    }

}


export async function logoutUser() {
    try {
        if (fs.existsSync(_getAutPath())) {
            fs.unlinkSync(_getAutPath())
            return true
        }
    } catch (error) {
        console.log()
        showError(error?.message)
        return false
    }

}




export async function getAccessToken() {

    if (await fs.existsSync(_getAutPath())) {
        const token = await fs.readFileSync(_getAutPath(), 'utf-8')
        return token
    } else {
        return 0
    }
}


export async function setAccessToken(token) {
    await fs.writeFileSync(_getAutPath(), token)
}

function _getAutPath() {
    const fileName = '.s3b.aut'
    const autPath = path.join(DATA_PATH, fileName) // authenticated user token
    return autPath
}