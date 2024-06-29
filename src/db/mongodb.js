import mongoose, { Schema } from "mongoose";

export const mongodbConfig = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGODB)
        console.log("🌿 MongoDB connected to <", (await connect).connection.name, ">")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)
const bucketSchema = new Schema(
    {
        name: {
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




export const Bucket = mongoose.model('Bucket', bucketSchema);
export const User = mongoose.model("User", userSchema)