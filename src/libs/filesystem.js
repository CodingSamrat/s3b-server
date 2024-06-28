import os from 'os'
import fs from 'fs'
import path from 'path';

import { HOST_NAME, BUCKET_PATH } from "../../s3b.config.js";

export function directoryExists(directoryName) {
    try {
        return fs.existsSync(directoryName) && fs.lstatSync(directoryName).isDirectory();
    } catch (err) {
        console.error('Error checking directory existence:', err);
        return false;
    }
}



export async function fileExists(filePath) {
    if (fs.existsSync(filePath)) {
        return true
    } else {
        return false
    }
}

export function getStoragePath(storageId) {
    return path.join(BUCKET_PATH, storageId)
}


export function getDownloadURL(filePath) {
    const relativePath = filePath.replace(`${CLOUD_BASE_PATH}\\`, '').replace(/\\/g, '/')
    return `${HOST_NAME}/${relativePath}`
}


export async function getFilePath(downloadURL) {
    const relativePath = String(downloadURL).trim().replace(`${HOST_NAME}/`, '')
    console.log(relativePath)
    return path.join(CLOUD_BASE_PATH, relativePath)
}



export async function getFileTree(dirPath) {
    const fileTree = {};

    // Read the contents of the directory
    const items = await fs.readdirSync(dirPath);

    items.forEach(async (item) => {
        const fullPath = path.join(dirPath, item);
        const stats = await fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // Recursively get the file tree of the subdirectory
            fileTree[item] = getFileTree(fullPath);
        } else {
            // Add the file to the tree
            fileTree[item] = 'file';
        }
    });

    return fileTree;
}




export async function separateFilenameAndExt(filename) {
    const parsedPath = path.parse(filename);
    return {
        name: parsedPath.name,
        ext: parsedPath.ext
    };
};


export async function getCloudPath() {
    const platform = os.platform();
    if (platform === 'win32') {
        return path.join(os.homedir(), 's3b-cloud')
    } else if (platform === 'linux') {
        return path.join('/', 'volume', 's3b-cloud')
    }
};