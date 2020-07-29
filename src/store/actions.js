import {
  SHOW_ARTICLES,
  SHOW_TAGS,
  userInfo,
  isLogged,
  error,
  LOADCOMMENT,
  LOADARTICLE,
} from "./types";

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

export function checkUser(url) {
  return function (dispatch) {
    if (localStorage.authToken) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          dispatch({ type: isLogged, payload: true });
          return dispatch({ type: userInfo, payload: user.user });
        })
        .catch((err) => dispatch({ type: userInfo, payload: null }));
      console.log("EDIT");
    }
  };
}

export function loadArticle(url, articleId) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        // console.log(article, "ACTION loadArticle")
        return dispatch({ type: LOADARTICLE, payload: article });
      });
    let urlComment = `https://conduit.productionready.io/api/articles/${articleId}/comments`;
    fetch(urlComment, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ comments }) => {
        return dispatch({ type: LOADCOMMENT, payload: comments });
      });
  };
}

export function handlePersonalFeed(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return dispatch({ type: SHOW_ARTICLES, payload: data.articles });
      });
  };
}

export function handleGlobalFeed(url) {
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return dispatch({ type: SHOW_ARTICLES, payload: data.articles });
      });
  };
}
