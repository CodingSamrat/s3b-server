
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : auth.controller.js
// Description  : Functionality for User Authentication
// =================================================================================




import jwt from 'jsonwebtoken'
import { response } from "../libs/response.js";
import { hashPassword, comparePassword } from "../libs/crypto.js";
import { getExpiryTime } from "../libs/timeConverter.js";
import { User } from '../db/index.js';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } from '../../s3b.config.js';
import { AuthToken } from '../constants.js';




// =================================================================================
// Name         : registerUser
// Description  : Register New User
// Method       : POST
// Route        : /api/v1/auth/create
// Access       : protected [auth]
// =================================================================================
export const CreateUser = async (req, res) => {
    try {
        const { fullName, username, email, password, mobile, isAdmin } = await req.body

        // console.log(await req.body)

        if (!username || !password) {
            return response(res, 401, { error: 'Username & Password are required' })
        }

        const existingUser = await User.findOne({ username })

        if (existingUser?._id) {
            return response(res, 401, { error: 'Username already exist' })
        }


        const user = await User.create(
            {
                fullName,
                username,
                email,
                password: await hashPassword(password),
                mobile,
                isAdmin
            }
        )



        // TODO: Send token with response
        return response(res, 200, { message: `User registered with username - ${username}`, user })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}


// =================================================================================
// Name         : DeleteUser
// Description  : Delete User
// Method       : DELETE
// Route        : /api/v1/auth/delete/:id
// Access       : protected [auth]
// =================================================================================
export const DeleteUser = async (req, res) => {
    const id = req.params.id

    try {
        if (!id) {
            return response(res, 401, { error: 'Invalid request' })
        }

        const user = await User.findByIdAndDelete(id)

        // TODO: Send token with response
        return response(res, 200, { message: `User deleted!`, user })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}





// =================================================================================
// Name         : loginUser
// Description  : Login Registered User
// Method       : POST
// Route        : /api/v1/auth/login
// Access       : public
// =================================================================================
export const LoginUser = async (req, res) => {

    try {

        const { username, password } = await req.body

        // console.log(await req.body)

        if (!username || !password) {
            return response(res, 401, { error: 'All fields are required' })
        }

        await User.find() //... DND

        // TODO: Check user exist or not
        const user = await User.findOne({ username })

        if (!user._id) {
            return response(res, 404, { error: 'No user found!' })
        }


        // TODO: Check Password
        if (!(await comparePassword(password, user.password))) {
            return response(res, 401, { error: 'Invalid password' })
        }


        // Generate access token
        const payload = {
            username
        }

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })

        // TODO: Set Cookies
        res.cookie(
            AuthToken.ACCESS_TOKEN,
            accessToken,
            {
                httpOnly: true,
                expires: getExpiryTime(ACCESS_TOKEN_EXPIRY)
            }
        )

        delete user.password

        return response(res, 200, { message: 'Login successful!', accessToken, user })

    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}








// =================================================================================
// Name         : UpdatePassword
// Description  : ...
// Method       : POST
// Route        : /api/v1/auth/update-password
// Access       : protected [auth]
// =================================================================================
export const UpdatePassword = async (req, res) => {
    try {
        let user = await req.user
        console.log('req user', user)
        const { currentPass, newPass } = await req.body
        // console.log(await req.body)

        if (!currentPass || !newPass) {
            return response(res, 401, { error: 'All fields are required' })
        }
        const dbUser = await User.findOne({ username: user.username })
        console.log('dbUser', dbUser)

        // TODO: Check Password

        if (!(await comparePassword(currentPass, dbUser.password))) {
            return response(res, 401, { error: 'Invalid current password' })
        }

        const updatedUser = await User.updateOne(
            { username: user.username },
            { password: await hashPassword(newPass) },
            { new: true }
        )

        return response(res, 200, { message: 'Password Updated', user: updatedUser })
    } catch (error) {
        console.log(error)
        if (error.message === "jwt expired") return response(res, 400, { error: "OTP is expired" })
        else return response(res, 500, { error: "Internal Server Error", })
    }
}




// =================================================================================
// Name         : logout
// Description  : ...
// Method       : POST
// Route        : /api/v1/auth/logout
// Access       : public
// =================================================================================
export const Logout = async (req, res) => {
    // console.log(await req.user)
    res.clearCookie(
        Tokens.AUTH_TOKEN,
        {
            domain: COOKIE_DOMAIN,
            httpOnly: true,
        }
    )
    return response(res, 200, { message: 'Logout successful' })

}




// =================================================================================
// Name         : GetCurrentUser
// Description  : ...
// Method       : GET
// Route        : /api/v1/auth/current
// Access       : protected [auth]
// =================================================================================
export const GetCurrentUser = async (req, res) => {
    const user = await req.user
    return response(res, 200, { message: 'Current User', user })

}


// =================================================================================
// Name         : GetAllUser
// Description  : ...
// Method       : GET
// Route        : /api/v1/auth/get
// Access       : protected [auth]
// =================================================================================
export const GetAllUser = async (req, res) => {
    const users = await User.find()
    return response(res, 200, { message: 'All Users', users })

}



