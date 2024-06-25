// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : app.controller.js
// Description  : Manage App
// =================================================================================

import { generateApiKeyAndSecret, generateBucketId } from "../libs/keyGen.js";
import fs from "fs";
import { response } from "../libs/response.js";
import { slugify } from "../libs/slugify.js";
import path from "path";
import { directoryExists } from "../libs/filesystem.js";
import { Bucket } from "../models/index.js";
import { BUCKET_PATH } from "../../s3b.config.js";







// =================================================================================
// Name         : CreateApp
// Description  : Register New User
// Method       : POST
// Route        : /api/v1/bucket/create
// Access       : protected [admin]
// =================================================================================
export const CreateBucket = async (req, res) => {
    const { projectName } = await req.body


    try {
        if (!projectName) {
            return response(res, 400, { error: 'Project name is required!' })
        }

        const { apiKey, apiSecret } = await generateApiKeyAndSecret()
        let bucketId = await generateBucketId(slugify(projectName))
        let bucketPath = path.join(BUCKET_PATH, bucketId)


        while (directoryExists(bucketPath)) {
            bucketId = await generateBucketId(slugify(projectName))
            bucketPath = path.join(BUCKET_PATH, bucketId)
        }

        await fs.mkdirSync(bucketPath, { recursive: true })


        const payload = {
            projectName,
            apiKey,
            apiSecret,
            bucketId,
        }

        const bucket = await Bucket.create(payload)


        return response(res, 200, { message: 'Bucket Created!', bucket })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}







// =================================================================================
// Name         : GetBucketById
// Description  : ...
// Method       : GET
// Route        : /api/v1/bucket/get/id/:id
// Access       : protected [auth]
// =================================================================================
export const GetBucketById = async (req, res) => {
    const bucketId = req.params.id
    try {
        const bucket = await Bucket.findById(bucketId)

        return response(res, 200, { message: 'Got Bucket By Id', bucket })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}





// =================================================================================
// Name         : GetBucketByUserId
// Description  : ...
// Method       : GET
// Route        : /api/v1/bucket/get
// Access       : protected [admin]
// =================================================================================
export const GetAllBucket = async (req, res) => {

    try {
        const allBucket = await Bucket.find()


        return response(res, 200, { message: `${allBucket.length} Bucket found`, allBucket })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}








// =================================================================================
// Name         : DeleteApp
// Description  : Register New User
// Method       : DELETE
// Route        : /api/v1/bucket/delete/:id
// Access       : protected [auth]
// =================================================================================
export const DeleteBucket = async (req, res) => {
    const bucketId = req.params.id
    try {
        const bucket = await Bucket.findByIdAndDelete(bucketId)

        let bucketPath = path.join(BUCKET_PATH, bucket.bucketId.toString())

        const del = await fs.rmdirSync(bucketPath)

        return response(res, 200, { message: 'Bucket Deleted', bucket })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}


