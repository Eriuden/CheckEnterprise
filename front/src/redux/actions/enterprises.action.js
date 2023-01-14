import axios from "axios";

export const GET_ENTERPRISE = "GET_ENTERPRISE"
export const GET_ENTERPRISES= "GET_ENTERPRISES"
export const ADD_ENTERPRISE = "ADD_ENTERPRISE"
export const LIKE_ENTERPRISE = "LIKE_ENTERPRISE"
export const UNLIKE_ENTERPRISE = "UNLIKE_ENTERPRISE"
export const DISLIKE_ENTERPRISE = "DISLIKE_ENTERPRISE"
export const UNDISLIKE_ENTERPRISE = "UNDISLIKE_ENTERPRISE"
export const UPDATE_ENTERPRISE = "UPDATE_ENTERPRISE"
export const DELETE_ENTERPRISE= "DELETE_ENTERPRISE"


//section comments
export const ADD_COMMENT= "ADD_COMMENT"
export const EDIT_COMMENT= "EDIT_COMMENT"
export const DELETE_COMMENT= " DELETE_COMMENT"

export const GET_ENTERPRISE_ERRORS = "GET_ENTERPRISE_ERRORS"

export const getEnterprises = (num) => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/enterprise/`)
        .then((res) => {
            /*la const array coupe le résultat entre premier index et jusqu
            à la sélection, si le payload n'est pas le même
            c'est car le second prend tout, donc faut lui indiquer tout*/
            const array = res.data.slice(0,num)
            dispatch ({type: GET_ENTERPRISE, payload: array})
            dispatch ({type: GET_ENTERPRISES, payload: res.data})
        })
        .catch((err) => {
            window.alert(err)
        })
    }

}

export const addEnterprise = (data) => {
    /*Il post direct selon le param
    Donc pas de cancer
    Dans tout les cas il check les erreurs, c'est juste que si y'a pas
    bah forcément, il nous dit RAS, sinon il la précise*/
    
    return (dispatch) => {
        return axios
        .post(`${process.env.REACT_APP_API_URL}api/enterprise/`, data)
        .then((res) => {
            //ici il comprends que le data du param et le data 
            //de res.data N EST PAS LE MEME
            if (res.data.errors) {
                dispatch({type: GET_ENTERPRISE_ERRORS, payload: res.data.errors})
            } else {
                dispatch({type: GET_ENTERPRISE_ERRORS, payload: ""})
            }
        })
    }
}

export const updateEnterprise = (enterpriseId, name, socialSiege, capital) => {
    return(dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/enterprise/${enterpriseId}`,
            data: {name, socialSiege, capital},
        })
        .then((res) => {
            dispatch({ type:UPDATE_ENTERPRISE, payload: {name, socialSiege,capital}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const likeEnterprise = (enterpriseId, userId) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}api/enteprise/like-enterprise/` + enterpriseId,
            data: {userId}
        })
        .then((res) => {
            dispatch({type: LIKE_ENTERPRISE, payload:{enterpriseId, userId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const unlikeEnterprise = (enterpriseId, userId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/enterprise/unlike-enterprise` + enterpriseId,
            data: {userId}
        })
        .then((res)=> {
            dispatch({type: UNLIKE_ENTERPRISE, payload: { enterpriseId, userId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}



export const dislikeEnterprise = (enterpriseId, userId) => {
    return(dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}api/enteprise/dislike-enterprise/` + enterpriseId,
            data: {userId}
        })
        .then((res) => {
            dispatch({type: DISLIKE_ENTERPRISE, payload:{enterpriseId, userId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const undislikeEnterprise = (enterpriseId, userId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/enterprise/undislike-enterprise` + enterpriseId,
            data: {userId}
        })
        .then((res)=> {
            dispatch({type: UNDISLIKE_ENTERPRISE, payload: { enterpriseId, userId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const deleteEnterprise = (enterpriseId, name, socialSiege, capital) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/enterprise/${enterpriseId}`,
            data: { name, socialSiege, capital},
        })
        .then((res) => {
            dispatch({ type: DELETE_ENTERPRISE, payload: {enterpriseId}})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}

export const addComment = (enterpriseId, commentId, commenterName, text) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url : `${process.env.REACT_APP_API_URL}api/enterprise/add-comment/${enterpriseId}`,
            data: {commentId, text, commenterName},
        })
        .then((res) => {
            dispatch({ type:ADD_COMMENT, payload: {enterpriseId}})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}

export const editComment = (enterpriseId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url : `${process.env.REACT_APP_API_URL}api/enterprise/edit-comment/${enterpriseId}`,
            data: {commentId, text},
        })
        .then((res) => {
            dispatch({ type:EDIT_COMMENT, payload: {enterpriseId, commentId, text}})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}

export const deleteComment = (enterpriseId, commentId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url : `${process.env.REACT_APP_API_URL}api/enterprise/delete-comment/${enterpriseId}`,
            data: {commentId},
        })
        .then((res)=> {
            dispatch({ type:DELETE_COMMENT, payload: {postId, commentId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}
