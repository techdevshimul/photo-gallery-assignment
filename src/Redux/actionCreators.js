import axios from 'axios';
import * as actionTypes from './actionTypes';
import { baseUrl, categoriesUrl, commentsUrl, extensionFormat, itemsUrl } from './dataBase';

export const loadItems = items => {
    return {
        type: actionTypes.LOAD_ITEMS,
        payload: items
    }
}

export const itemLoadFailed = () => {
    return {
        type: actionTypes.ITEM_LOAD_FAILED
    }
}

export const fetchItems = () => dispatch => {
    axios.get(baseUrl + itemsUrl + extensionFormat)
        .then(response => {
            dispatch(loadItems(response.data));
        })
        .catch(err => {
            dispatch(itemLoadFailed());
        })
}

export const loadComments = comments => {
    return {
        type: actionTypes.LOAD_COMMENTS,
        payload: comments
    }
}

export const commentLoadFailed = () => {
    return {
        type: actionTypes.COMMENT_LOAD_FAILED
    }
}

export const fetchComments = () => dispatch => {
    axios.get(baseUrl + commentsUrl + extensionFormat)
        .then(response => {
            dispatch(loadComments(response.data));
        })
        .catch(err => {
            dispatch(commentLoadFailed());
        })
}


export const loadCategories = categories => {
    return {
        type: actionTypes.LOAD_CATEGORIES,
        payload: categories
    }
}

export const categoryLoadFailed = () => {
    return {
        type: actionTypes.CATEGORY_LOAD_FAILED
    }
}

export const fetchCategories = () => dispatch => {
    axios.get(baseUrl + categoriesUrl + extensionFormat)
        .then(response => {
            dispatch(loadCategories(response.data));
        })
        .catch(err => {
            dispatch(categoryLoadFailed());
        })
}

export const selectedItemFunc = item => {
    return {
        type: actionTypes.SELECTED_ITEM,
        payload: item
    }
}

export const selectedCategoryFunc = category => {
    return {
        type: actionTypes.SELECTED_CATEGORY,
        payload: category
    }
}


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let authUrl = null;

    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }

    const API_KEY = "AIzaSyBZrfgBzDMVFozCzuN6h9hWMtIZxTD_CI4";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);
            const expirationTime = new Date((new Date().getTime() + (response.data.expiresIn * 1000)));
            localStorage.setItem("expirationTime", expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
        })
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout())

    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (expirationTime <= new Date()) {
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}

export const submitComment = (userName, userComment, itemId) => dispatch => {
    dispatch(commentSubmitLoading(true));
    const comment = {
        itemId: itemId,
        userName: userName,
        comment: userComment,
        addTime: new Date(),
    }

    axios.post(baseUrl + commentsUrl + extensionFormat, comment)
        .then(response => {
            if (response.status === 200) {
                dispatch(commentSubmitLoading(false));
                dispatch(fetchComments());
                dispatch(commentSubmitSuccess("Comment Submitted Successfully!"));
                setTimeout(() => dispatch(commentSubmitSuccess(null)), 3000);
                setTimeout(() => dispatch(commentSubmitFailed(null)), 3000);
            }
        })
        .catch(err => {
            dispatch(commentSubmitSuccess(null));
            dispatch(commentSubmitLoading(false));
            dispatch(commentSubmitFailed(err.message));
            setTimeout(() => dispatch(commentSubmitSuccess(null)), 3000);
            setTimeout(() => dispatch(commentSubmitFailed(null)), 3000);
        });

}

export const commentSubmitLoading = isLoading => {
    return {
        type: actionTypes.COMMENT_SUBMIT_LOADING,
        payload: isLoading,
    }
}

export const commentSubmitFailed = errMsg => {
    return {
        type: actionTypes.COMMENT_SUBMIT_FAILED,
        payload: errMsg
    }
}
export const commentSubmitSuccess = successMsg => {
    return {
        type: actionTypes.COMMENT_SUBMIT_SUCCESS,
        payload: successMsg
    }
}
