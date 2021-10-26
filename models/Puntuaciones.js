const mongoose = require(`mongoose`)
const Schema = mongoose.Schema;

const puntuacionSchema = new Schema({
    username: { type:String, required: true},
    score: { type:Number, required: true},
});
// argumento, nombre del modelo y el tipo de esquema
const Puntuacion = mongoose.model("Punctuaciones", puntuacionSchema)
module.exports = Puntuacion;