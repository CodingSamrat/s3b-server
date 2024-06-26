import ApiManager from "./apiManager.js"



export async function getAllUsers() {
    try {
        const { data } = await ApiManager.get(`/auth/get`)

        return data.users
    } catch (error) {
        console.log(error?.message)
        console.log('> ', error?.response?.data?.error)
    }
}


export async function deleteUser(id) {
    try {
        const { data } = await ApiManager.delete(`/auth/delete/${id}`)

        return data
    } catch (error) {
        console.log(error?.message)
        console.log('> ', error?.response?.data?.error)
    }
}


export async function createUser(body) {
    try {
        const { data } = await ApiManager.post(`/auth/create`, body)

        return data
    } catch (error) {
        console.log(error?.message)
        console.log('> ', error?.response?.data?.error)
    }
}