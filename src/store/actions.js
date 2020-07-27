import { SHOW_ARTICLES, SHOW_TAGS, userInfo, isLogged, error } from "./types";

function showArticles(payload) {
  return {
    type: SHOW_ARTICLES,
    payload,
  };
}
function showTags(payload) {
  return {
    type: SHOW_TAGS,
    payload,
  };
}
// function userData(payload) {
//   return {
//     type: userInfo,
//     payload,
//   };
// }
export function fetchArticle(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ articles }) => {
        return dispatch(showArticles(articles));
      });
  };
}
export function fetchTag(url) {
  return function (dispatch) {
    fetch(url)
      .then((res) => res.json())
      .then(({ tags }) => {
        return dispatch(showTags(tags));
      });
  };
}
export function handleSignin(url, userInfo, history) {
  console.log(history, "history");
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
          // this.props.dispatch.updateLoggedIn(true);
        } else {
          return dispatch({ type: error, payload: "Something went wrong!" });
        }
        return res.json();
      })
      .then(({ user }) => {
        user && dispatch({ type: isLogged, payload: true });
        user && localStorage.setItem("authToken", user.token);
        return dispatch({ type: userInfo, payload: user });
      });
  };
}

export function handleTags(tag) {
  return function (dispatch) {
    fetch(
      `https://conduit.productionready.io/api/articles?tag=${tag}&limit=10&offset=0`
    )
      .then((res) => res.json())
      .then(({ articles }) => {
        return dispatch(showArticles(articles));
      });
  };
}
