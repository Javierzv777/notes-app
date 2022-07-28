import { SET_NOTES, SET_NOTE, GET_NOTE, ADD_NOTE,
    SUCCESS_ARCHIVE
} from './actions'
const initialState = {
    notes:[],
    note: {},
    localNotes: []
}

export const reducer = (state = initialState, { type, payload }) => {
    switch(type){
        case SET_NOTES :
            return {
                ...state, notes: [...payload] 
            }
        case SET_NOTE :
            return {
                ...state, note: { ...payload}
            }
        case GET_NOTE :
            return {
                ...state, note: { ...state.notes.find(note => note.id === payload)}
            }
        case ADD_NOTE :
            return {
                ...state, localNotes: [...state.localNotes, payload]
            }
        case SUCCESS_ARCHIVE :
            console.log('fdfs')
            state.localNotes.splice(payload,1)
            return {
                ...state, localNotes: [ ...state.localNotes]
            }
        default: return state
    }
}