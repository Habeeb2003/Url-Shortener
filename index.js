const express = require("express")
const { randomBytes } = require("crypto")
const path = require("path")
const mongoose= require('mongoose');
const Link = require("./models/Link");
const env = require('dotenv').config({path: __dirname + '/.env'})

const app = express()


const URI = process.env.MONGODB_URI
const portNo = process.env.PORT_NO

const baseUrl = process.env.BASE_URL + portNo

mongoose.connect(URI, (err) => {
    if (err) {
        throw err
    }
})

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "urlShortener.html"))
})


app.post("/shortenLink", async (req, res) => {
    const { link } = req.body
    const newLinkId = randomBytes(5).toString("hex")

    try {
        

        const newLink = await Link.create({ linkId: newLinkId, link })
        const shortenedLink = baseUrl + "/li/" + newLinkId
        res.send({shortenedLink})

    } catch (err) {
        if (err) {
            throw new Error(err)
        }
    }

})

app.get("/li/:link_id", async (req, res) => {
    const { link_id } = req.params
    if(link_id == "favicon.ico"){
        res.send()
    }
        
    // try {

        const originalLink = await Link.findOne({linkId: link_id})
        if(originalLink != null) {
            if(originalLink.link != null){
                res.redirect(originalLink.link)
            }
        }
        else{
            res.redirect(baseUrl)
        }

    // } catch (err) {
    //     if (err) {
    //         throw new Error(err)
    //     }
    // }

})

app.listen(portNo, () => {
    console.log(`app is listening on port ${portNo}`);
})