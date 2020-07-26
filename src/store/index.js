import { createStore, applyMiddleware } from "redux";
import { SHOW_ARTICLES, SHOW_TAGS } from "./types";
const initialState = {
  articles: [],
  tags: []
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
    default:
      return state;
  }
}
let thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  return next(action);
};
export let store = createStore(reducer, applyMiddleware(thunk));
