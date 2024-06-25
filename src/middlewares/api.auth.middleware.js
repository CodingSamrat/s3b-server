

import { response } from "../libs/response.js";
import { Bucket } from "../models/index.js";


export const apiKeyAuth = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const apiSecret = req.headers['x-api-secret'];
    const bucketId = req.headers['x-bucket-id'];

    // console.log({ apiKey, apiSecret, bucketId })

    if (!apiKey || !apiSecret || !bucketId) {
        return response(res, 400, { error: 'Illegal attempt!' })
    }

    try {
        const bucket = await Bucket.findOne({ apiKey, apiSecret, bucketId });

        if (!bucket) {
            return response(res, 403, { error: 'API key is not valid' })
        }


        req.bucket = bucket;
        next ? next() : ""

    } catch (error) {
        console.log(error.message)
        next(error)
    }

};

