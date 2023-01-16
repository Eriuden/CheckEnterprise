import { GET_USERS } from "../actions/users.action";

const initialstate = {}

export default function usersReducer(state = initialstate, action) {
    switch(action.type) {
        case GET_USERS:
            return action.payload
        default:
            return state
    }
}