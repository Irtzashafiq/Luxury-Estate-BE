const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        
    }, email: {
        type: String,
        required: true,
    }, password: {
        type: String,
        required: true,
    }, token: {
        type: String,
        
    }, is_registered: {
        type: Boolean,
        default: false,
    }, isAdmin: {
        type: Boolean,
        default: false,
    },

},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User;