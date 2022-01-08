const fs = require('fs')
const path = require('path')
const {data} = require('./dataForCreateUsers')
const users = [];

const createUsers = (quantity) => {
    for(let i = 0; i < quantity; i++){
        const randomIntForGeneration = Math.floor(Math.random()*10)
        const randomintegerForNames = randomIntForGeneration > 5
                                                                ?Math.floor(Math.random()*data.menNames.length)
                                                                :Math.floor(Math.random()*data.womenNames.length)
        const randomintegerForAvatars = Math.floor(Math.random()*data.avatars.length)
        const randomintegerForCityes = Math.floor(Math.random()*data.cityes.length)
        const follow = randomIntForGeneration > 5
        const name = randomIntForGeneration > 5
                        ?data.menNames.slice(randomintegerForNames, randomintegerForNames+1).join('')
                        :data.womenNames.slice(randomintegerForNames, randomintegerForNames+1).join('')
        const city = data.cityes.slice(randomintegerForCityes, randomintegerForCityes+1).join('')
        const avatar = data.avatars.slice(randomintegerForAvatars, randomintegerForAvatars+1).join('')
        const sex = randomIntForGeneration > 5? 'man' : 'women'
        users.push({
            name: name,
            sex: sex,
            follow: follow,
            city: city,
            avatar: avatar
        })
    }
}


const saveUsersToFile = (users) => {
    fs.writeFileSync("hello.txt", JSON.stringify(users, null, '\t'))
}

createUsers(300)
saveUsersToFile(users)
