const express = require("express");
const bodyParser = require("body-parser");
const {Post} = require('./moongoseClient');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//CRUD DE LA API
//CREATE 
app.post('/swapi/v1/post', (req, res)=>{
    const {post, name, model, passengers} = req.body;
    const nuevoPost = Post ({
        //post,
        name,
        model,
        passengers
    });

    nuevoPost.save((err, Post)=>{
        err ? res.status(409).send(err) : res.status(201).send(post);
    })
})

//GET ALL
app.get('/swapi/v1/post/', (req, res) => {
    Post
    .find()
    .exec()
    .then((post)=>{
        res.status(200).send(post)
    })
    .catch(error => res.status(404).send(error))
})

//GET BY ID
app.get('/swapi/v1/post/:uid', (req, res) => {
    const {uid} = req.params;
    Post.findById(uid).exec()
    .then(post => {
        post 
        ? res.status(200).send(post) 
        : res.status(404).send({message:"Error: Post no encontrada"}) 
    })
    .catch(err => {
        res.status(409).send(err)
    });
});

//UPDATE
app.put('/swapi/v1/post/:uid', (req, res) => {
    const {uid} = req.params;
    Post.findByIdAndUpdate(uid, {$set : req.body}, {new: true}).exec()
    .then(newPost => res.status(201).send(newPost))
    .catch(err => res.status(409).send(err))
});

//DELETE
app.delete("/swapi/v1/post/:uid", (req, res) =>{
    const {uid} = req.params;
    Post.findByIdAndRemove(uid).exec()
    .then(post => {
        res.status(204).send({
            message : "Post borrado exitosamente",
            body : post
        })
    })
    .catch(err => {
        res.status(404).send(err)
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});

