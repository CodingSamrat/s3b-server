import { Bucket } from "./db/index.js"

export const AuthToken = {
    ACCESS_TOKEN: '_aut' // authenticated user token
}

export let AllBuckets = null;
export async function fetchAllBucket() {
    AllBuckets = await Bucket.find()
}

