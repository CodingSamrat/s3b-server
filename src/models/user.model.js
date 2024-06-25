import Mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = new Schema(
    {
        fullName: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
        },

        isAdmin: {
            type: Boolean,
        },
    },
    {
        timestamps: true
    }
)



userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            isAdmin: this.isAdmin ? this.isAdmin : undefined,
        },
        process.env.AUTH_TOKEN_SECRET,
        {
            expiresIn: process.env.AUTH_TOKEN_EXPIRY
        }
    )
}

export const User = Mongoose.model("User", userSchema)