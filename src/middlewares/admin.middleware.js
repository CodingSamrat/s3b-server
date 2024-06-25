import { response } from "../libs/response.js";


const admin = async (req, res, next) => {
    try {
        const user = await req.user

        if (!user._id) {
            return response(res, 401, { error: 'Insufficient Privilege! Need admin privilege to access.' })
        }

        next ? next() : ""


    } catch (err) {
        console.log(err);
        return response(res, 500, { error: 'Internal Server Error!' })
    }
};

export default admin;