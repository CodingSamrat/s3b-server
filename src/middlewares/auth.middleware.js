import jwt from "jsonwebtoken";
import { User } from "../db/index.js";
import { response } from "../libs/response.js";
import { ACCESS_TOKEN_SECRET } from "../../s3b.config.js";
import { AuthToken } from "../constants.js";




const auth = async (req, res, next) => {
    // Access the Authentication Token from cookie or request header
    const token = await req.cookies[AuthToken.ACCESS_TOKEN] || req.header("Authorization")?.replace("Bearer ", "")

    // console.log(token)
    // Check if there is any token or not
    if (!token) {
        return response(res, 401, { error: 'Unauthorized request! Login first to get access' })
    }


    try {
        // Decode Authentication Token
        let decodedData = {}
        try {
            decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);
            // Token is valid
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return response(res, 401, { error: 'Session expired!' })
            } else {
                console.log('JWT verification error:', error.message);
            }
        }

        // Find User using decoded User ID
        const authUser = await User.findOne({ username: decodedData.username })

        // delete user.password
        const user = { _id: authUser._id, username: authUser.username }

        if (!user._id) {
            return response(res, 401, { error: 'Invalid Access Token!' })
        }

        req.user = user;
        next ? next() : ""


    } catch (err) {
        console.log(err);
        return response(res, 500, { error: 'Internal Server Error!' })
    }
};

export default auth;