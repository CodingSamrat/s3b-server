import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { response } from "../libs/response.js";
import { ACCESS_TOKEN_SECRET } from "../../s3b.config.js";
import { AuthToken } from "../constants.js";

const createUserObject = (data, keys) => {
    const keysArray = keys.split(' ');
    const keysToExclude = new Set();

    keysArray.forEach(key => {
        if (key.startsWith('-')) {
            keysToExclude.add(key.slice(1));
        }
    });

    return Object.fromEntries(
        Object.entries(data)
            .filter(([key, value]) => value !== undefined && !keysToExclude.has(key))
    );
};


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
        const decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);


        // Find User using decoded User ID
        const authUser = await User.findOne({ username: decodedData.username })

        // delete user.password
        const user = createUserObject(authUser, '-password')

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