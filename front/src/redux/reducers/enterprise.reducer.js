import { GET_ENTERPRISE, UPDATE_ENTERPRISE, DELETE_ENTERPRISE, LIKE_ENTERPRISE, DISLIKE_ENTERPRISE, UNLIKE_ENTERPRISE, UNDISLIKE_ENTERPRISE, DELETE_COMMENT, EDIT_COMMENT} from "../actions/enterprises.action";

const initialstate = {}

export default function enterpriseReducer (state = initialstate, action) {
    switch (action.type) {
        case GET_ENTERPRISE:
            return action.payload

        case UPDATE_ENTERPRISE:
            return state.map((enterprise) => {
                if (enterprise.id === action.payload.enterpriseId) {
                    return {
                        ...enterprise,
                        name: action.payload.name,
                        socialSiege: action.payload.socialSiege,
                        capital: action.payload.capital
                    }
                } else return enterprise
            })
        case DELETE_ENTERPRISE:
            return state.filter((enterprise) => enterprise._id !== action.payload.enterpriseId)
        
        case LIKE_ENTERPRISE:
            return state.map((enterprise) => {
                if (enterprise._id === action.payload.enterpriseId)
                    return {
                        ...enterprise,
                        likers: [action.payload.userId, ...enterprise.likers]
                    }
            })
        case DISLIKE_ENTERPRISE:
            return state.map((enterprise) => {
                if (enterprise._id === action.payload.enterpriseId)
                    return {
                        ...enterprise,
                        dislikers: [action.payload.userId, ...enterprise.dislikers]
                    }
            })
        case UNLIKE_ENTERPRISE:
            return state.map((enterprise) => {
                if (enterprise._id === action.payload.enterpriseId)
                    return {
                        ...enterprise,
                        likers: enterprise.likers.filter((id) => id !== action.payload.userId)
                    }
                return enterprise
            })
        case UNDISLIKE_ENTERPRISE:
            return state.map((enterprise) => {
                if (enterprise._id === action.payload.enterpriseId)
                    return {
                        ...enterprise,
                        dislikers: enterprise.dislikers.filter((id) => id !== action.payload.userId)
                    }
                return enterprise
            })

        case EDIT_COMMENT:
            return state.map((enterprise) => {
                if (enterprise._id === action.payload.enterpriseId) {
                    return {
                        ...enterprise,
                        comment: enterprise.comment.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else return comment
            })
            
        case DELETE_COMMENT:
            return state.map((enterprise) => {
                if (enterprise.id === action.payload.enterpriseId) {
                    return {
                        ...enterprise,
                        comments: enterprise.comment.filter((comment) => comment._id !== action.payload.commentId)
                }
            } else return post 
        })

        default:
            return state
        
    }   
    
}