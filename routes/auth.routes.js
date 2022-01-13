const Router = require("express");
const User = require("../models/User")
const router = new Router()
const config = require("config")
const jwt = require("jsonwebtoken")


router.post('/registration', async (req, res) => {
    try{
        const {email, password, name, sex, city, avatar} = req.body
        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }

        const user = new User({email, password, name, sex, city, avatar})
        await user.save()

        return res.json({message: `User was created`})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})


router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({message: `There is no user with email: ${email}`})
        }
        
        const isPasswordValid = user.password === password

        if(!isPasswordValid){
            return res.status(400).json({message: `wrong Password`})
        }

        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({message: {
            token,
            user: {
                id:  user.id,
                email:user.email,
                name: user.name,
                sex:user.sex,
                city: user.city
            }
        }})
    }catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})



module.exports = router