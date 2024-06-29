import { showError } from "../../libs/log.js"
import ApiManager from "./apiManager.js"

export async function createBucket(name) {
    try {
        const { data } = await ApiManager.post('/bucket/create', { name })
        return data
    } catch (error) {
        console.log('ERROR:', error?.response?.data?.error)
        return 0
    }
}





export async function getAllBucket() {
    try {
        const { data } = await ApiManager.get('/bucket/get')

        return data.allBucket
    } catch (error) {
        showError(error?.response?.data?.error)
    }
}




export async function deleteBucket(bucketId) {
    try {
        const { data } = await ApiManager.delete(`/bucket/delete/${bucketId}`)

        return data
    } catch (error) {
        showError(error?.response?.data?.error)
    }
}