import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Project from "./models/project"
import path from "path";

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;
const dbUrl = process.env.MONGODB_URI

app.use(express.static(path.join(__dirname, 'client/build')))
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
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
      });

    app.listen(port, err => {
     if (err) throw new Error(err)
     else console.log(`listening on port ${port}`)
    })
})
