const express = require("express")
const mongoose = require("mongoose") 
const config = require("config")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/corsMiddlware.middleware')
const authRouter = require("./routes/auth.routes")
const users = require("./routes/users.routes")


app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)    


const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"))
        app.listen(PORT, () => {
            console.log(`Serv started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

