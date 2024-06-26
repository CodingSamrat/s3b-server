import ApiManager from "./apiManager.js"

export async function createBucket(projectName) {
    try {
        const { data } = await ApiManager.post('/bucket/create', { projectName })
        return data?.message
    } catch (error) {
        console.log('> ', error.response.data.error)
        return 0
    }
}





export async function getAllBucket() {
    try {
        const { data } = await ApiManager.get('/bucket/get')

        return data.allBucket
    } catch (error) {
        console.log('> ', error.response.data.error)
    }
}




export async function deleteBucket(bucketId) {
    try {
        const { data } = await ApiManager.delete(`/bucket/delete/${bucketId}`)

        return data.message
    } catch (error) {
        console.log('> ', error.response.data.error)
    }
}