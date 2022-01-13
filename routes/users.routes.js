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
    const limit = 10;
    const countToInt = req.query.count - 0
    const countUser = countToInt <= limit? countToInt : limit;
    const quantity = await User.collection.countDocuments()
    try{
        const users = await User.find({}).limit(countUser)
        return res.status(400).json({
                                     data: {users: users},
                                     meta: {count: quantity}
                                    })
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router