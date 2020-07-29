import { createStore, applyMiddleware } from "redux";
import {
  SHOW_ARTICLES,
  SHOW_TAGS,
  userInfo,
  error,
  isLogged,
  LOADARTICLE,
  LOADCOMMENT,
} from "./types";

import thunk from "redux-thunk";

const initialState = {
  articles: [],
  tags: [],
  userInfo: [],
  error: "",
  isLogged: false,
  loadArticle: [],
  loadComment: [],
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
    case isLogged:
      return {
        ...state,
        isLogged: action.payload,
      };
    case LOADARTICLE:
      console.log(action, "CALLED FROM ACTION");
      return {
        ...state,
        loadArticle: action.payload,
      };
    case LOADCOMMENT:
      return {
        ...state,
        loadComment: action.payload,
      };
    default:
      return state;
  }
}
export let store = createStore(reducer, applyMiddleware(thunk));
