import mongoose from "mongoose";
mongoose.Promise = global.Promise

const ProjectSchema = new mongoose.Schema({
    name:String,
    age:Number
})

const Project = mongoose.model("Project", ProjectSchema);

export default Project;