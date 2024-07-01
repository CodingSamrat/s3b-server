
import path from "path";
import os from "os";
import { getCloudPath } from "./src/libs/filesystem.js";



// Server configuration variables
// PORT specifies the port number on which the server will listen for incoming requests.
export const PORT = "8800";

// API_VERSION is used to version the API endpoints. This allows for backward compatibility if the API changes in the future.
export const API_VERSION = "v1";

// API_BASE constructs the base URL for the API endpoints using the version number.
export const API_BASE = `/api/${API_VERSION}`;

// HOST_NAME defines the hostname for the server including the port number.
// This should be updated in production or if the server is hosted on a different machine.
export const HOST_NAME = `http://spidy.codingsamrat.com`;

// Path configuration variables
// CLOUD_BASE_PATH sets the base directory for storing all cloud-related files.
// By default, it creates a directory named `/volume/s3b-cloud` in linux,
// And `C:/s3b-cloud` in windows. 
// Make sure this directories has sufficient privilege
export const CLOUD_BASE_PATH = await getCloudPath();

// BUCKET_PATH is the directory path where uploaded files will be stored.
export const BUCKET_PATH = path.join(CLOUD_BASE_PATH, 'bucket');

// DATA_PATH is the directory path where database-related files or other data will be stored.
export const DATA_PATH = path.join(os.homedir(), '.s3b');

// CORS (Cross-Origin Resource Sharing) configuration
// TRUSTED_HOST is an array of trusted origins. These origins are allowed to make requests to the server.
// This is important for security to prevent unauthorized domains from accessing your API.
export const TRUSTED_HOST = [
    "*", // Add your backend CORS domain here
];

// File upload configuration
// MAX_FILE_SIZE sets the maximum allowed file size for uploads.
// This is important for controlling the resource usage on the server and can be adjusted based on requirements.
// Note: Ensure your proxy server (e.g., Nginx, Apache) is also configured to allow the same or higher file size limit.
export const MAX_FILE_SIZE = '50mb';

// Database configuration
// DATABASE specifies the type of database being used by the application.
// The default value is 'filexdb', which indicates a file-based database.
// For MongoDB, change the value to 'mongodb' and uncomment the MONGODB_URI line.
export const DATABASE = 'filexdb';

// MONGODB_URI is the connection string for MongoDB.
// It should be set in the .env file if MongoDB is used.
// Uncomment the following line to use MongoDB and ensure the connection string is properly configured in the .env file.
// export const MONGODB_URI = process.env.MONGODB;

// Authentication configuration
// ACCESS_TOKEN_SECRET is a secret key used for signing and verifying JSON Web Tokens (JWT).
// This should be a strong, unique and long.
export const ACCESS_TOKEN_SECRET = 'uDKseoo1/6xmHYYU/d5pBkcUofnYZVMPcReybIuoS5y147Z3MS';

// ACCESS_TOKEN_EXPIRY defines the expiration time for the access tokens.
// This can be set to control how long a token remains valid before the user needs to re-authenticate.
export const ACCESS_TOKEN_EXPIRY = '1d';

// Export default object containing all configurations
export default {
    PORT,
    API_VERSION,
    API_BASE,
    HOST_NAME,
    CLOUD_BASE_PATH,
    BUCKET_PATH,
    DATA_PATH,
    TRUSTED_HOST,
    MAX_FILE_SIZE,
    DATABASE,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
};
