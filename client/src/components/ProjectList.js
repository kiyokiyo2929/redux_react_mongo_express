import React from "react";
import axios from "axios";
import { requestData, receiveDataSuccess, receiveDataFailed } from "./actions";
import { useSelector, useDispatch } from "react-redux";


const ProjectList = () => {
    const isFetching  = useSelector( state => state.projectReducer.isFetching);
    const projectArray  = useSelector( state => state.projectReducer.projectArray);
    const dispatch = useDispatch();

    const handleFetchData = () => {
        dispatch(requestData())
        axios.get("/api/list")
        .then(response => {
            const _projectArray = response.data
            dispatch(receiveDataSuccess(_projectArray))
        })
        .catch(err => {
            console.error(new Error(err))
            dispatch(receiveDataFailed())
        })
    }

    const handleUpdateProject = id => {
         dispatch(requestData())
         axios.put("/api/list", {
             id
         })
         .then(response => {
             const _projectArray = response.data
             dispatch(receiveDataSuccess(_projectArray))
         })
         .catch(err => {
             console.error(new Error(err))
             dispatch(receiveDataFailed())
         })
    }

    const handleDeleteProject = id => {
        dispatch(requestData())
        axios({
            method:"delete",
            url:"/api/list",
            data: {
                id
            }
        })
        .then(response => {
            const _projectArray = response.data
            dispatch(receiveDataSuccess(_projectArray))
        })
        .catch(err=>{
            console.error(new Error(err))
            dispatch(receiveDataFailed())
        })
    }

    return (
        <div>
            {
             isFetching?
             <h2>Now Loading...</h2>
             :<div>
                 <button onClick={()=>handleFetchData()}>fetch data</button>
                 <ul>
                     {projectArray.map(project =>(
                         <li key={project._id}>
                             {`${project.name} (${project.age})`}
                             <button onClick={()=>handleUpdateProject(project._id)}>+1</button>
                             <button onClick={()=>handleDeleteProject(project._id)}>delete</button>
                         </li>
                     ))}
                 </ul>

             </div>

            }
           
        </div>
    )
}

export default ProjectList;