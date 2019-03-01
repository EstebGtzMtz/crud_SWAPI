const mongoose = require("mongoose")
const URL = "mongodb://esteban:g13143099@ds155815.mlab.com:55815/swapi_yamblet"

mongoose.connect(URL, {useNewUrlParser: true}, () => {
    console.log("Conexión exitosa a la BD");
})

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId; //AUTOINCREMENTABLE DE MONGO AKA EL ID

const shipSchema = new Schema({
    //post: ObjectId,
    name: String,
    model: String,
    passengers: String
   
}) 

const Post= mongoose.model("Post", shipSchema);

module.exports = {Post}