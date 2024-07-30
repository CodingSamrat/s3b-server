

import { response } from "../libs/response.js";
import { AllBuckets } from "../constants.js";


export const apiKeyAuth = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const apiSecret = req.headers['x-api-secret'];
    const bucketId = req.headers['x-bucket-id'];

    // console.log({ apiKey, apiSecret, bucketId })

    if (!apiKey || !apiSecret || !bucketId) {
        return response(res, 400, { error: 'Illegal attempt!' })
    }

    try {
        const bucket = await findByAllCredentials(AllBuckets, apiKey, apiSecret, bucketId);

        if (!bucket._id) {
            return response(res, 403, { error: 'API key is not valid' })
        }


        req.bucket = bucket;
        next ? next() : ""

    } catch (error) {
        console.log(error.message)
        next(error)
    }

};

const findByAllCredentials = (array, apiKey, apiSecret, bucketId) => {
    return array.find(item =>
        item.apiKey === apiKey &&
        item.apiSecret === apiSecret &&
        item.bucketId === bucketId
    );
};