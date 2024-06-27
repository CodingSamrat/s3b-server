
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : file.controller.js
// Description  : ...
// =================================================================================

import path from "path";
import { response } from "../libs/response.js";
import fs from "fs";
import { getDownloadURL, separateFilenameAndExt, } from "../libs/filesystem.js";
import { directoryExists, fileExists } from "../libs/filesystem.js";
import { BUCKET_PATH, HOST_NAME } from "../../s3b.config.js";
import dirTree from "directory-tree";







// =================================================================================
// Name         : UploadMultipleFile
// Description  : upload File
// Method       : POST
// Route        : /api/v1/file/upload
// Access       : protected [admin]
// =================================================================================
export const UploadMultipleFile = async (req, res) => {
    return response(res, 201, { message: 'This feature is not available now' })
    const { dir } = await req.body
    const file = req.files

    console.log(file)
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
// Name         : uploadFile
// Description  : upload File
// Method       : POST
// Route        : /api/v1/file/upload
// Access       : protected [admin]
// =================================================================================
export const UploadFile = async (req, res) => {
    const { dir } = await req.body
    const { bucketId } = req.bucket
    const file = req.file

    try {
        let finalDir = path.join(BUCKET_PATH, bucketId, dir)
        let finalDestination = path.join(BUCKET_PATH, bucketId, dir, file.filename)



        if (!directoryExists(finalDir)) {
            await fs.mkdirSync(finalDir, { recursive: true })
        }


        let i = 1
        while (await fileExists(finalDestination)) {
            const { name, ext } = await separateFilenameAndExt(file.filename)

            const filename = `${name}_${i}${ext}`
            finalDestination = path.join(BUCKET_PATH, bucketId, dir, filename)
            i++
        }



        // Copy the file
        await fs.copyFileSync(path.resolve(file.path), finalDestination);

        // Remove the original file
        await fs.unlinkSync(path.resolve(file.path));

        if (!fileExists(finalDestination)) {
            return response(res, 400, { error: 'Internal Server Error' })
        }


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
export const DeleteFile = async (req, res) => {
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
export const IsFileExist = async (req, res) => {
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
export const GetBucketTree = async (req, res) => {
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






// =================================================================================
// Name         : ReadDir
// Description  : ...
// Method       : GET
// Route        : /api/v1/file/get/folder
// Access       : protected [apiKeyAuth]
// =================================================================================
export const ReadDir = async (req, res) => {
    const { dir } = req.body
    const { bucketId } = req.bucket

    try {
        const dirData = []

        const dirPath = path.join(BUCKET_PATH, bucketId, dir)


        const items = await fs.readdirSync(dirPath)


        items.forEach(async (item, i) => {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);

            if (stat.isFile()) {
                const obj = {
                    isFile: true,
                    path: itemPath,
                    name: item
                }
                await dirData.push(obj)
            } else if (stat.isDirectory()) {
                const obj = {
                    isFile: false,
                    path: itemPath,
                    name: item
                }
                await dirData.push(obj)
            }
        });

        // dirData = JSON.stringify(dirData, null, 2)

        return response(res, 201, { message: 'Bucket Tree!', dirData })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}







// =================================================================================
// Name         : ReadDir
// Description  : ...
// Method       : GET
// Route        : /api/v1/file/copy
// Access       : protected [apiKeyAuth]
// =================================================================================
export const Copy = async (req, res) => {
    const { source, destination } = req.body
    const { bucketId } = req.bucket

    let bucketPath = path.join(BUCKET_PATH, bucketId)
    let sourcePath = path.join(bucketPath, source)
    let destinationPath = path.join(bucketPath, destination)
    try {
        if (!fileExists(sourcePath)) {
            return response(res, 400, { error: 'No such file or directory' })
        }

        const _filename = path.basename(destinationPath)
        let i = 1
        while (await fileExists(destinationPath)) { // img.png
            const { name, ext } = await separateFilenameAndExt(_filename)


            const filename = `${name}_${i}${ext}`

            destinationPath = path.join(path.dirname(destinationPath), filename)
            i++
        }

        if (!directoryExists(path.dirname(destinationPath))) {
            await fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
        }

        // Copy the file
        await fs.copyFileSync(sourcePath, destinationPath);

        if (!fileExists(destinationPath)) {
            return response(res, 400, { error: 'Internal Server Error' })
        }


        // dirData = JSON.stringify(dirData, null, 2)

        return response(res, 201, { message: 'File Copied!', success: true })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}






// =================================================================================
// Name         : ReadDir
// Description  : ...
// Method       : GET
// Route        : /api/v1/file/get/folder
// Access       : protected [admin]
// =================================================================================
export const Move = async (req, res) => {
    const { source, destination } = req.body
    const { bucketId } = req.bucket

    let bucketPath = path.join(BUCKET_PATH, bucketId)
    let sourcePath = path.join(bucketPath, source)
    let destinationPath = path.join(bucketPath, destination)
    try {

        if (!fileExists(sourcePath)) {
            return response(res, 400, { error: 'No such file or directory' })
        }

        const _filename = path.basename(destinationPath)
        let i = 1
        while (await fileExists(destinationPath)) { // img.png
            const { name, ext } = await separateFilenameAndExt(_filename)


            const filename = `${name}_${i}${ext}`

            destinationPath = path.join(path.dirname(destinationPath), filename)
            i++
        }

        if (!directoryExists(path.dirname(destinationPath))) {
            await fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
        }

        // Copy the file
        await fs.copyFileSync(sourcePath, destinationPath);

        if (! await fileExists(destinationPath)) {
            return response(res, 400, { error: 'Internal Server Error' })
        }


        await fs.unlinkSync(sourcePath)
        if (await fileExists(sourcePath)) {
            return response(res, 400, { error: 'Internal Server Error' })
        }


        // dirData = JSON.stringify(dirData, null, 2)

        return response(res, 201, { message: 'File Moved!', success: true })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error' })
    }
}


