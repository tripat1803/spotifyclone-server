const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        providerId: {
            type: String,
            unique: [true, "Id already exists"],
            trim: true,
        },
        providerType: {
            type: String,
            default: "email",
        },
        isProviderVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
        },
        countryCode: {
            type: String,
            trim: true,
            default: "+91",
        },
        mobile: {
            type: String,
            trim: true
        },
        isMobileVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "vendor"]
        }
    },
    {
        timestamps: true,
    }
);

exports.User = mongoose.model("users", userSchema);