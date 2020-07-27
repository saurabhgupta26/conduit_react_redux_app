import { createStore, applyMiddleware } from "redux";
import { SHOW_ARTICLES, SHOW_TAGS, userInfo, error } from "./types";
import thunk from "redux-thunk";
const initialState = {
  articles: [],
  tags: [],
  userInfo: [],
  error: "",
  isLogged: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SHOW_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    case userInfo:
      return {
        ...state,
        userInfo: action.payload,
      };
      case error:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
export let store = createStore(reducer, applyMiddleware(thunk));
