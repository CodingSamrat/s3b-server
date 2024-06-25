
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : file.controller.js
// Description  : ...
// =================================================================================

import path from "path";
import { response } from "../libs/response.js";
import fs from "fs";
import { getDownloadURL, } from "../libs/filesystem.js";
import { directoryExists, fileExists } from "../libs/filesystem.js";
import { BUCKET_PATH, HOST_NAME } from "../../s3b.config.js";
import dirTree from "directory-tree";







// =================================================================================
// Name         : uploadFile
// Description  : upload File
// Method       : POST
// Route        : /api/v1/file/upload
// Access       : protected [admin]
// =================================================================================
export const uploadFile = async (req, res) => {
    const dir = await req.body.dir
    const file = req.file

    const { bucketId } = req.bucket
    try {
        let finalDir = path.join(BUCKET_PATH, bucketId, dir)
        let finalDestination = path.join(BUCKET_PATH, bucketId, dir, file.filename)
        let relativePath = path.join(bucketId, dir, file.filename)?.replace(/\\/g, '/');



        if (!directoryExists(finalDir)) {
            await fs.mkdirSync(finalDir, { recursive: true })
        }

        const separateFilenameAndExt = (filename) => {
            const parsedPath = path.parse(filename);
            return {
                name: parsedPath.name,
                ext: parsedPath.ext
            };
        };


        let i = 1
        while (await fileExists(finalDestination)) {
            const { name, ext } = separateFilenameAndExt(file.filename)
            const filename = `${name}_${i}${ext}`
            finalDestination = path.join(BUCKET_PATH, bucketId, dir, filename)
            i++
        }

        console.log()

        // ...
        // await fs.renameSync(path.resolve(file.path), finalDestination)

        // Copy the file
        await fs.copyFileSync(path.resolve(file.path), finalDestination);

        // Remove the original file
        await fs.unlinkSync(path.resolve(file.path));

        if (!fileExists(finalDestination)) {
            return response(res, 400, { error: 'Internal Server Error' })
        }

        console.log()
        const downloadURL = getDownloadURL(finalDestination)

        return response(res, 200, { message: 'File uploaded!', downloadURL })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}






// =================================================================================
// Name         : deleteFile
// Description  : delete File
// Method       : POST
// Route        : /api/v1/file/delete
// Access       : protected [admin]
// =================================================================================
export const deleteFile = async (req, res) => {
    const { downloadUrl } = await req.body

    try {
        const relativePath = downloadUrl.replace(`${HOST_NAME}/`, '')
        const filePath = path.join(BUCKET_PATH, relativePath)

        // Delete file
        if (fileExists(filePath)) {
            fs.unlinkSync(filePath)
        } else {
            return response(res, 404, { error: 'File dose not exist!' })
        }



        return response(res, 200, { message: 'File deleted!', filePath })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}






// =================================================================================
// Name         : isFileExist
// Description  : ...
// Method       : POST
// Route        : /api/v1/file/is-exist
// Access       : protected [admin]
// =================================================================================
export const isFileExist = async (req, res) => {
    const { downloadUrl } = await req.body


    try {
        const relativePath = downloadUrl.replace(`${HOST_NAME}/`, '')
        const filePath = path.join(BUCKET_PATH, relativePath)

        const isExist = await fileExists(filePath)

        if (isExist) {
            return response(res, 201, { message: 'File exist!', isExist })
        } else {
            return response(res, 200, { message: 'File dose not exist!', isExist })
        }

    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}







// =================================================================================
// Name         : getBucketTree
// Description  : ...
// Method       : GET
// Route        : /api/v1/file/get/bucket-tree
// Access       : protected [admin]
// =================================================================================
export const getBucketTree = async (req, res) => {
    const { bucketId } = req.bucket
    try {
        const bucketPath = path.join(BUCKET_PATH, bucketId)

        let tree = await dirTree(bucketPath);
        tree = JSON.stringify(tree, null, 2)

        return response(res, 201, { message: 'Bucket Tree!', tree })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}


