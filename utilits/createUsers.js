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
        const followers = []

        const name = randomIntForGeneration > 5
                        ?data.menNames.slice(randomintegerForNames, randomintegerForNames+1).join('')
                        :data.womenNames.slice(randomintegerForNames, randomintegerForNames+1).join('')
        const city = data.cityes.slice(randomintegerForCityes, randomintegerForCityes+1).join('')
        const avatar = data.avatars.slice(randomintegerForAvatars, randomintegerForAvatars+1).join('')
        const sex = randomIntForGeneration > 5? 'man' : 'women'
        users.push({
            email: `somEmail${i}@gmai.com`,
            password: 'ghreaeihvaewuviwuphgweigsdfniofewihf',
            name: name,
            sex: sex,
            city: city,
            avatar: avatar
        })
    }
}


const saveUserToDataBase = async (url, user) => {
    try {
        const response = await fetch(url, {
          method: 'POST', // или 'PUT'
          body: JSON.stringify(user), 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
      } catch (error) {
        console.error('Ошибка:', error);
      }
}

const addUsersToDB = (users) => {
    for(let userId = 0; userId <= users.length; userId++){
        saveUserToDataBase('http://localhost:5000/api/auth/registration', users[userId])
    }
    
}

createUsers(10)
addUsersToDB(users)