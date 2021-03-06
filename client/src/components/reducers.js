import { combineReducers } from "redux";
import {CHANGE_NAME, CHANGE_AGE, INITIALIZE_FORM, REQUEST_DATA, RECEIVE_DATA_SUCCESS, RECEIVE_DATA_FAILED} from "./actions";


const initialState = {
    form:{
        name:"",
        age:""
    },
    project: {
        isFetching:false,
        projectArray:[]
    },
}

const formReducer = (state = initialState.form, action) =>{
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name:action.name
            }
        case CHANGE_AGE:
            return {
                ...state,
                age:action.age
            }
        case INITIALIZE_FORM:
            return initialState.form
        default:
            return state
    }
}

const projectReducer = (state =initialState.project, action) => {
    switch(action.type){
        case REQUEST_DATA:
            return {
                ...state,
                isFetching:true,
            }
        case RECEIVE_DATA_SUCCESS:
            return {
                ...state,
                isFetching:false,
                projectArray:action.projectArray,
            }
        case RECEIVE_DATA_FAILED:
            return {
                ...state,
                isFetching:false
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    formReducer,
    projectReducer
})

export default rootReducer