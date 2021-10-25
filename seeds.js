require('dotenv').config()
const mongoose = require(`mongoose`)
const Puntuacion = require(`./models/Puntuaciones`)
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ly1xx.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`).then(function(){
//     console.log("Estamos conectados")
// }).catch((error)=>{console.log(`Ha ocurrido el siguiente error:${error}`)})

let puntuaciones = [{
    username: "Luis",
    score: "15"
},
{
    username: "Javier",
    score: "12"
},
{
    username: "Lucía",
    score: "30"
},
{
    username: "Pedro",
    score: "20"
},
{
    username: "Jesús",
    score: "15"
}]
// User.deleteMany().then((deletedUsers)=>{
//     console.log(deletedUsers);
//     User.create(users).then((createdUsers) => {console.log(createdUsers), mongoose.disconnect()})
// });

const createInfo = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ly1xx.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`).then(function(){
        console.log("Estamos conectados")
    }).catch((error)=>{console.log(`Ha ocurrido el siguiente error:${error}`)})
    let deletedPuntuaciones = await Puntuacion.deleteMany();
    console.log(deletedPuntuaciones)
    let createPuntuaciones = await Puntuacion.create(puntuaciones);
    console.log(createPuntuaciones)
    // mongoose.disconnect()
}
createInfo()