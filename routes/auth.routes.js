const Router = require("express");
const User = require("../models/User")
const router = new Router()

router.post('/registration', async (req, res) => {
    try{
        const {email, password, name, sex, city, avatar} = req.body
        console.log(email, password, name, sex, city, avatar)
        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }

        const user = new User({email, password, name, sex, city, avatar})
        await user.save()

        return res.status(400).json({message: `User was created`})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})


router.get('/count', async (req, res) => {
    try{
        const quantity = await User.collection.countDocuments()
        console.log(quantity)
        return res.status(400).json({count: quantity})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({}).skip(3).limit(3)
        console.log(users)
        return res.status(400).json({count: users})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})


module.exports = router