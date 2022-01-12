const Router = require("express");
const User = require("../models/User")
const router = new Router()

router.get('/count', async (req, res) => {
    try{
        const quantity = await User.collection.countDocuments()
        return res.status(400).json({count: quantity})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('/users', async (req, res) => {
    const maxCount = 10
    const s = req.query.count <= maxCount? req.query.count : maxCount

    res.send(JSON.stringify(users.slice(0, s), null, '\t'))
})


module.exports = router