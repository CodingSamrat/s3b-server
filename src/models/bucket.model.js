
import Mongoose, { Schema } from "mongoose";

const bucketSchema = new Mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        bucketId: {
            type: String,
            required: true,
        },
        apiKey: {
            type: String,
            required: true,
        },
        apiSecret: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Bucket = Mongoose.model('Bucket', bucketSchema);
