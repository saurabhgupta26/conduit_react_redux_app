import { SHOW_ARTICLES, SHOW_TAGS } from "./types";

// export function showArticles(payload) {
//   return {
//     type: SHOW_ARTICLES,
//     payload,
//   };
// }
// export function showTags(payload) {
//   return {
//     type: SHOW_TAGS,
//     payload,
//   };
// }
export function fetchArticle(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ articles }) => {
        // dispatch(showArticles(articles));
        dispatch({
          type: SHOW_ARTICLES,
          payload: articles,
        });
      });
  };
}
export function fetchTag(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ tags }) => {
        // dispatch(showTags(tags));
        dispatch({
          type: SHOW_TAGS,
          payload: tags,
        });
      });
  };
}
