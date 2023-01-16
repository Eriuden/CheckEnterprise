import { GET_USER, UPDATE_USER, DELETE_USER, UPLOAD_PICTURE } from "../actions/user.action";

const initialstate = {}

export default function userReducer ( state= initialstate, action) {
    switch(action.type){
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload,
                bio: action.payload,
                password: action.payload
            }
        case DELETE_USER:
            return state.filter((user) => user._id !== action.payload.userId)
        default:
            return state
    }
}