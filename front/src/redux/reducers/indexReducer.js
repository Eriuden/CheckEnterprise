import {combineReducers} from "redux"
import userReducer from "./user.reducer"
import usersReducer from "./users.reducer"
import enterpriseReducer from "./enterprise.reducer"
import enterprisesReducer from "./enterprises.reducer"
import errorReducer from "./error.reducer"

const reducers = combineReducers({
    userReducer,
    usersReducer,
    enterpriseReducer,
    enterprisesReducer,
    errorReducer,
})

export default reducers