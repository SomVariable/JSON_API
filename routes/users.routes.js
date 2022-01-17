const Router = require("express");
const User = require("../models/User")
const router = new Router()

router.get('/count', async (req, res) => {
    try{
        const quantity = await User.collection.countDocuments()
        return res.json({count: quantity})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('/users', async (req, res) => {
    console.log(req.query)
    const limit = 10;
    const countToInt = !!req.query.count? req.query.count : limit
    const countUser = countToInt <= limit? countToInt -0: limit;
    console.log(countToInt)
    console.log('countUser: ', countUser)
    const quantity = await User.collection.countDocuments()
    const countPages = Math.ceil(quantity / countUser)
    //if page === false current page === 0
    const currentPage= !!req.query.page?req.query.page - 1:0
    const skipedUsers = currentPage * countUser
    console.log(skipedUsers)

    try{
        const users = await User.find({}).skip(skipedUsers).limit(countUser)
        return res.json({
                                     data: {users: users},
                                     meta: {count: quantity,
                                            countPages: countPages
                                        }
                                    })
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router