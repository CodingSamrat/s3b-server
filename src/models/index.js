import FileXdb from "filexdb";
import { DATA_PATH } from "../../s3b.config.js";

const db = new FileXdb(`${DATA_PATH}/s3b.filex.db`)

export const User = await db.collection('user')
export const Bucket = await db.collection('bucket')

