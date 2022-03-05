import React from "react";
import axios from "axios";
import { changeName, changeAge, initializeForm, requestData, receiveDataSuccess, receiveDataFailed } from "./actions";
import { useSelector, useDispatch } from "react-redux";

const AddForm = () => {
    const dispatch = useDispatch();
    const name = useSelector(state => state.formReducer.name);
    const age = useSelector(state => state.formReducer.age);

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/list", {
            name, 
            age
        })
        .then(response => {
            dispatch(initializeForm())
            const projectArray = response.data
            dispatch(receiveDataSuccess(projectArray))
        })
        .catch(err => {
            console.error(new Error(err))
            dispatch(receiveDataFailed())
        })
    }


    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    名前:
                    <input value={name} onChange={e => dispatch(changeName(e.target.value))}/>
                </label>
                <label>
                    年齢:
                    <input value={age} onChange={e => dispatch(changeAge(e.target.value))}/>
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>{name}/{age}</p>
        </div>
    )
}

export default AddForm