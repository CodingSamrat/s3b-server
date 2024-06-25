
import { config } from 'dotenv'
import path from "path";
import os from "os";


// ENV Variables .env config
config()
export const DEBUG = process.env.NODE_ENV === 'development'


// Server configurations
export const PORT = "8000";
export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;
// Replace HOST_NAME in production or if using different host machine
export const HOST_NAME = `http://localhost:${PORT}`;




// 
// PATH: Physical Path on drive, 
// by default it will a create a dir `~/s3b-cloud`
// Replace CLOUD_BASE_PATH with actual location 
// where you want to store your data and files
export const CLOUD_BASE_PATH = path.join(os.homedir(), 's3b-cloud') // Replace the path/to/cloud/
export const BUCKET_PATH = path.join(CLOUD_BASE_PATH, 'storage')
export const DATA_PATH = path.join(CLOUD_BASE_PATH, 'data')



// 
// CORS
export const TRUSTED_HOST = [
    "http://localhost:5000", // Your CORS domain (backend)
]


// Files size limit
// This is required to send large file 
// Also you need to modify your proxy server
export const MAX_FILE_SIZE = '50mb'



// Database 
// By default s3b-server uses `FileXdb` for database
// The server is also configured for `MongoDB`
// In order to use `MongoDB` go through `./src/models/index.js` 
export const DATABASE = 'filexdb'
// change to `mongodb` 👆 and uncomment 👇 the bellow line to use MongoDB
// export const MONGODB_URI = process.env.MONGODB



// Authentication Tokens
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY



