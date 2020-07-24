import {createStore} from "redux";
import {SHOW_ARTICLES} from "./types";

const initialState = {
    articles : []
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case SHOW_ARTICLES : 
        return {
            ...state, 
            articles : action.payload,
        };
        case SHOW_TAGS : 
        return {
            ...state, 
            tags : action.payload,
        };
        default: 
        return state;
    }
}

export let store = createStore(reducer);