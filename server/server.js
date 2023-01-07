const express = require("express")
const bodyparser = require("body-parser")
const userRoutes = require("./routes/user.route")
const enterpriseRoutes = require("./routes/enterprise.route")
const cookieParser = require("cookie-parser")
require("dotenv").config({path: "./config/.env"})
require("./config/db")
const {checkUser, requireAuth} = require("./middleware/auth.middleware")
const cors = require("cors")
const app = express()

app.use(cors({origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    "allowedHeaders": ["sessionId", "content-type"],
    "exposedHeaders": ["sessionId"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false 
}

app.use(cors(corsOptions))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("*", checkUser)
app.get("/jwtid", requireAuth, (req,res) => {
    res.status(200).send(res.locals.user._id)
})

app.use("/api/user", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Branché sur le port ${process.env.PORT}`)
})