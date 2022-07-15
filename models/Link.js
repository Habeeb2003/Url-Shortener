const { Schema, model } = require('mongoose')

const linkSchema = new Schema(
    {
        linkId:{
            type: String,
            unique: true
        },
        link: {
            type: String, 
        }
    },
    {
        timestamps: true
    }
)

module.exports = model("links", linkSchema)