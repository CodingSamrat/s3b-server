import { show, showError } from "../../libs/log.js"
import path from 'path'
import fs from 'fs'
import { generateApiKeyAndSecret, generateBucketId } from "../../libs/keyGen.js";
import { slugify } from "../../libs/slugify.js";
import { Bucket } from "../../db/index.js";
import { BUCKET_PATH } from "../../../s3b.config.js";
import { directoryExists } from "../../libs/filesystem.js";



export async function createBucket(name) {
    try {
        if (!name) {
            return showError('Project name is required!')
        }

        const { apiKey, apiSecret } = await generateApiKeyAndSecret()
        let bucketId = await generateBucketId(slugify(name))
        let bucketPath = path.join(BUCKET_PATH, bucketId)


        while (directoryExists(bucketPath)) {
            bucketId = await generateBucketId(slugify(name))
            bucketPath = path.join(BUCKET_PATH, bucketId)
        }

        await fs.mkdirSync(bucketPath, { recursive: true })


        const payload = {
            name,
            apiKey,
            apiSecret,
            bucketId,
        }

        const bucket = await Bucket.create(payload)

        console.log()
        return show(`Bucket Created! '${bucketId}'`)
    } catch (error) {
        console.log(error)
        return showError('Internal Server Error')
    }
}





export async function getAllBucket() {
    try {
        const allBucket = await Bucket.find()

        return allBucket
    } catch (error) {
        showError(error?.response?.data?.error)
    }
}




export async function deleteBucket(bucketId) {
    try {
        const bucket = await Bucket.deleteOne({ bucketId })

        let bucketPath = path.join(BUCKET_PATH, bucket?.bucketId?.toString())

        const del = await fs.rmdirSync(bucketPath)

        console.log()
        show(`Bucket Deleted! '${bucketId}'`)
        return true
    } catch (error) {
        showError(error?.response?.data?.error)
        return false
    }
}