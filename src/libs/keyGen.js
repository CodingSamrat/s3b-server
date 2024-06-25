
import crypto from 'crypto'

// Function to generate a random API key
export async function generateApiKeyAndSecret() {
    const apiKey = crypto.randomBytes(22).toString('hex');
    const apiSecret = crypto.randomBytes(34).toString('hex');

    return { apiKey, apiSecret }
}
export async function generateBucketId(slug) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let uniqueId = slug + '-';

    for (let i = 0; i < 9; i++) {
        uniqueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return uniqueId;
}