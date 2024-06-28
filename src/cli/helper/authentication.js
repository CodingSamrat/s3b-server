import { DATA_PATH } from "../../../s3b.config.js";
import fs from 'fs'
import path from 'path'
import ApiManager from "./apiManager.js";
import inquirer from 'inquirer';


export async function loginUser(username, password) {
    if (!username || !password) {
        return console.log('Credential missing')
    }
    try {
        const { data } = await ApiManager.post('/auth/login', { username, password })
        console.log(data)
        const aut = data.accessToken
        if (aut) {
            fs.writeFileSync(_getAutPath(), aut)
        }
        return { success: true }
    } catch (error) {
        console.log('ERROR:', error.response.data.error)
        return { success: false }
    }

}




export async function logoutUser() {
    try {
        if (fs.existsSync(_getAutPath())) {
            fs.unlinkSync(_getAutPath())
        }
    } catch (error) {
        console.log('ERROR:', error.message)
    }

}



export async function isAuth() {
    try {
        if (fs.existsSync(_getAutPath())) {
            const { data } = await ApiManager.get('/auth/current')
            if (data.user._id) {
                return true
            }
        } else {
            return false
        }
    } catch (error) {
        console.log('ERROR:', error.response.data.error)
    }

}

export async function promptLogin() {
    // Define the questions for the login form
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: 'Enter your username:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username.';
                }
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password:',
            mask: '*',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password.';
                }
            }
        }
    ];
    // Prompt the user with the questions
    const answers = await inquirer.prompt(questions);
    return answers;

}



export async function _getAccessToken() {

    if (await fs.existsSync(_getAutPath())) {
        const token = await fs.readFileSync(_getAutPath())
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