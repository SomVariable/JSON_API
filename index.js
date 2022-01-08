const express = require("express")
const mongoose = require("mongoose") 
const config = require("config")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/corsMiddlware.middleware')

const users = [{name: 'Name1', data: 'data1'},
    {name: 'Name2', data: 'data2'},
    {name: 'Name3', data: 'data3'},
    {name: 'Name4', data: 'data4'},
    {name: 'Name5', data: 'data5'},
    {name: 'Name6', data: 'data6'},
    {name: 'Name7', data: 'data7'},
    {name: 'Name8', data: 'data8'},
    {name: 'Name9', data: 'data9'},
    {name: 'Name10', data: 'data10'},
    {name: 'Name11', data: 'data11'},
    {name: 'Name12', data: 'data12'},
    {name: 'Name13', data: 'data13'},
    {name: 'Name15', data: 'data15'},
    {name: 'Name16', data: 'data16'}
    ]

app.use(corsMiddleware)
app.get('/users', (req, res) => {
    const maxCount = 10
    const s = req.query.count <= maxCount? req.query.count : maxCount
    res.send(JSON.stringify(users.slice(0, s), null, '\t'))
})

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

