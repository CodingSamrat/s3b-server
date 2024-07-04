import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, DATA_PATH } from "../../../s3b.config.js";
import fs from 'fs'
import path from 'path'
import { User } from "../../db/index.js"
import { comparePassword, hashPassword } from "../../libs/crypto.js"
import { show, showError } from "../../libs/log.js"
import { getCurrentUser, SetCurrentUser } from "../constant.js"
import { passwordPrompt } from "../prompts/user.prompt.js"
import jwt from 'jsonwebtoken'
import inquirer from "inquirer";

export async function loginUser(username) {
    console.log('\n 🗝️  Enter password for user -', username)
    const { password } = await passwordPrompt()

    if (!username || !password) {
        showError('Invalid Credential!')
        return false
    }

    const user = await User.findOne({ username })

    if (!user._id) {
        showError('No user found!')
        return false
    }

    // console.log(password, user.password)
    // TODO: Check Password
    let isSuccess = false
    try {
        if (!(await comparePassword(password, user.password))) {
            showError('Invalid password')
            return false
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



        if (await comparePassword('admin', user.password)) {
            await changeAdminPassword(username)
            await loginUser(username)
        }

        return true
    }
    else {
        showError('Login Failed!')
        return false
    }
}


export async function changeAdminPassword(username) {
    console.log()
    console.log('Welcome to s3b-server cli admin panel!!!')
    console.log('Good to see you :)')
    console.log('⚠︎  For security reason change your admin password')
    console.log("'''''''''''''''''''''''''''''''''''''''''''''''''''''''")
    let prompt = await passwordPrompt(true)

    while (prompt.password !== prompt.cnfPassword) {
        showError('password doesn\'t match')
        console.log('Please try again!\n')

        prompt = await passwordPrompt(true)
    }

    try {
        const user = await User.updateOne({ username }, { password: await hashPassword(prompt.password) })

        if (user?._id) {
            show('Admin password has changed!')
        }

    } catch (error) {
        showError(error?.message)
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

export async function updatePassword() {
    const validatePassword = (input, answers) => {
        if (input !== answers.newPassword) {
            return 'Passwords do not match!';
        }
        return true;
    };
    try {
        const { username } = await getCurrentUser()
        console.log(username)
        const answers = await inquirer.prompt([
            {
                type: 'password',
                name: 'currentPassword',
                message: 'Enter your current password:',
                mask: '*',
                validate: input => input ? true : 'Current password is required'
            },
            {
                type: 'password',
                name: 'newPassword',
                message: 'Enter your new password:',
                mask: '*',
                validate: input => input ? true : 'New password is required'
            },
            {
                type: 'password',
                name: 'confirmPassword',
                message: 'Confirm your new password:',
                mask: '*',
                validate: validatePassword
            }
        ]);


        const oUser = await User.findOne({ username })
        if (!(await comparePassword(answers.currentPassword, oUser?.password))) {
            console.log()
            showError('Incorrect current password!')
            return
        }


        const user = await User.updateOne({ username }, { password: await hashPassword(answers.newPassword) })

        if (user?._id) {
            console.log()
            show(`password updated!`)
        }

    } catch (error) {
        console.log(error)
        showError(error?.message)
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