// For FileXdb
import FileXdb from "filexdb";
import { DATA_PATH } from "../../s3b.config.js";


// Initialize FileXdb database instance with the specified file path
const db = new FileXdb(`${DATA_PATH}/s3b.filex.db`);

// Define collections
export const User = await db.collection('user');        // 'user'
export const Bucket = await db.collection('bucket');    // 'bucket'



// For MongoDB
// This section is commented out to indicate it's an alternative for MongoDB operations.
// If using MongoDB, uncomment the following line to export operations from 'mongodb.js':
// export * from './mongodb.js';
