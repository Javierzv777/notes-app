import axios from 'axios';
export const SET_NOTES = "SET_NOTES";
export const SET_NOTE = "SET_NOTE";
export const GET_NOTE = "GET_NOTE";
export const ADD_NOTE = "ADD_NOTE";
export const SUCCESS_ARCHIVE = "SUCCESS_ARCHIVE";

export const setNotes = (data, id) => {
    return async (dispatch) =>{
        axios.post("/notes", data)
        .then( response => {
            dispatch({type: SUCCESS_ARCHIVE, payload: id})
            dispatch({type: SET_NOTES , payload: response.data})})
    }
}

export const getNotes = (email) => {
    return async (dispatch) => {
        axios.get(`/notes/${email}`)
        .then( response => dispatch({type: SET_NOTES , payload: response.data}))
    }
}


export const getByCategory = (category, email) => {
    return async (dispatch) => {
        axios.get(`/category?category=${category}&email=${email}`)
        .then(res => dispatch({type: SET_NOTES, payload: res.data}))
    }
} 

export const updateNote = (note) => {
    return async (dispatch) => {
        axios.put(`/notes`, note)
        .then(res => dispatch({type: SET_NOTES, payload: res.data}))
        .then(()=> dispatch(getNotes(note.email)))
    }
}

export const setNote = (note) => {
    return (dispatch) => {
        dispatch({type: SET_NOTE, payload: note})
    }
}

export const getNote = (note) => {
    return (dispatch) => {
        dispatch({type: GET_NOTE, payload: note})
    }
}

export const deleteNote = (id, email) => {
    return async (dispatch) => {
        axios.delete(`/notes/?id=${id}&email=${email}`)
        .then(res => dispatch({type: SET_NOTES, payload: res.data}))
        .catch(e => {})
    }
}

export const addNote = (note) => {
    return (dispatch) => {
        dispatch ({type: ADD_NOTE, payload: note})
    }
}