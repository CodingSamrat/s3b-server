import crypto from 'crypto'

export default async () => {
    let length = 50
    // Generate a buffer with random bytes
    const randomBytes = crypto.randomBytes(length);

    // Convert the random bytes to a base64 string
    const base64String = randomBytes.toString('base64');

    // Slice the base64 string to ensure it matches the desired length
    const secretKey = base64String.slice(0, length);
    console.log()
    console.log('Secret Key: '.toUpperCase(), secretKey)
}