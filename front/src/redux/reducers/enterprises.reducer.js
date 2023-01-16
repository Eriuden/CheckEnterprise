import react from {react}
import { GET_ENTERPRISES } from "../actions/enterprises.action"

const initialstate = {}

export default function enterprisesReducer (state = initialstate, action) {
    switch (action.type) {
        case GET_ENTERPRISES:
            return action.payload
        default:
            return state
    }
}