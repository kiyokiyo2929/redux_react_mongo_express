import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Project from "./models/project"
import path from "path";

const app = express();
const port = process.env.PORT || 3001;
const dbUrl = "mongodb+srv://redux:Kiyohide1979@cluster0.7vhgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


app.use(express.static(path.join(__dirname,"client/build")))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect(dbUrl, dbErr => {

    if(dbErr) throw new Error(dbErr)
    else console.log("db connected")

    app.get("/api/list", (request, response)=>{
        Project.find({}, (err, data) => {
            if (err) response.status(500).send()
            else response.status(200).send(data)
        })
    })

    app.post("/api/list", (request, response)=>{
        const {name, age} = request.body;

        new Project({
            name, age
        })
        .save(err => {
            if(err) response.status(500)
            else {
                Project.find({}, (findErr, data)=>{
                    if(findErr) response.status(500).send()
                    else response.status(200).send(data)
                })
            }
        })
    })

    app.put("/api/list", (request, response)=>{
        const {id} = request.body;
        Project.findByIdAndUpdate(id, {$inc:{"age":1}}, err =>{
            if(err) response.status(500).send()
            else {
                Project.find({}, (findErr, data)=>{
                    if(findErr)response.status(500).send()
                    else response.status(200).send(data)
                })
            }
        })
    })
   


    app.delete("/api/list", (request, response) => {
        const {id} = request.body
        Project.findByIdAndRemove(id, err => {
            if (err) response.status(500).send()
            else {
                Project.find({}, (findErr, data) => {
                    if(findErr) response.status(500).send()
                    else response.status(200).send(data)
                })
            }
        })
    })

    app.get('*', (req, res, next) => {
        // Serve index.html file if it doesn't recognize the route
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html')); // <- Here !
      });

    app.listen(port, err => {
     if (err) throw new Error(err)
     else console.log(`listening on port ${port}`)
    })
})
