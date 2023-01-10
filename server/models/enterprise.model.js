const mongoose = require("mongoose")

const enterpriseSchema = new mongoose.Schema(
    {
        enterpriseName: {
            type:String,
            required:true 
        },

        socialSiege: {
            type:String,
            required:true,
        },

        capital: {
            type: String,
            required:true,
        },

        likers: {
            type:[String],
            required:true,
        },

        dislikers: {
            type:[String],
            required:true,
        },

        comments: {
            type: [
                {
                    commenterId: String,
                    commenterName: String,
                    text:String,
                    timestamp: Number,
                }
            ],
            required:true,
        },
    },

    { timestamps: true,}
)

const enterpriseModel = mongoose.model("enterprise", enterpriseSchema)
module.exports = enterpriseModel