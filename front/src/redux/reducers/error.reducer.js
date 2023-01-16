import { GET_ENTERPRISE_ERRORS } from "../actions/enterprises.action";
import { GET_USER_ERRORS } from "../actions/user.action";

const initialstate = { userError: [] , enterpriseError: []}

// Les erreurs étant réparties dans différentes tables
// l'initial state contiendra cette fois deux tableaux vides

export default function errorReducer(state = initialstate, action) {
    switch(action.type) {
        case GET_ENTERPRISE_ERRORS:
            return{
                enterpriseError: action.payload,
                userError: []
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload,
                enterpriseError: []
            }
        default:
            return state
    }
}