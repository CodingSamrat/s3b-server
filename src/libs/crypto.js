import bcryptjs from "bcryptjs";



export const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    return hashedPassword;
}


export const comparePassword = async (password, hash) => {
    const isValid = await bcryptjs.compare(password, hash)
    return isValid;
}
