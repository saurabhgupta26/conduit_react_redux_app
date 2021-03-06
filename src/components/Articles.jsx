import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArticle, checkUser } from "../store/actions";
import { SHOW_ARTICLES } from "../store/types";

class Articles extends React.Component {
  componentDidMount() {
    const url =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    this.props.dispatch(fetchArticle(url));
  }

  refreshArticles = () => {
    const url =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    this.props.dispatch(fetchArticle(url));
  };

  handleFavourite = (slug, e) => {
    console.log(slug, "SLUG in favourites");
    alert("POST");
    let articleId = slug;
    e.target.classList.add("unfavorite");
    let url = `https://conduit.productionready.io/api/articles/${articleId}/favorite`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        let index = this.props.articles.findIndex((elem) => elem.slug === slug);
        let articles = this.props.articles.slice();
        articles[index].favorited = article.favorited;
        articles[index].favoritesCount = article.favoritesCount;
        this.props.dispatch({ type: SHOW_ARTICLES, payload: articles });
      });
  };
  handleUnfavourite = (slug, e) => {
    let articleId = slug;
    alert("DELETE");
    if (e.target.classList.contains("unfavorite"))
      e.target.classList.remove("unfavorite");
    let url = `https://conduit.productionready.io/api/articles/${articleId}/favorite`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        let index = this.props.articles.findIndex((elem) => elem.slug === slug);
        let articles = this.props.articles.slice();
        articles[index].favorited = article.favorited;
        articles[index].favoritesCount = article.favoritesCount;
        this.props.dispatch({ type: SHOW_ARTICLES, payload: articles });
      });
  };

  render() {
    const { articles } = this.props;
    return (
      <>
        {articles.map((elem, i) => {
          return (
            <section className="article_top container" key={i}>
              {console.log(elem.favorited, "IS FAVOURITED")}
              <div className="flex">
                <div className="flex">
                  <img
                    src={elem.author.image}
                    className="author_img"
                    alt="img"
                  />
                  <Link
                    className="article_author"
                    to={`profile/${elem.author.username}`}
                  >
                    <span className="author">{elem.author.username}</span>
                    <span className="article_date">
                      {elem.createdAt.split("T")[0]}
                    </span>
                  </Link>
                </div>
                {!elem.favorited ? (
                  <button
                    className="favorite_count"
                    onClick={(e) => this.handleFavourite(elem.slug, e)}
                    key={i}
                  >
                    <i class="fas fa-heart"></i>
                    {elem.favoritesCount}
                  </button>
                ) : (
                  <button
                    className="favorite_count"
                    onClick={(e) => this.handleUnfavourite(elem.slug, e)}
                    key={i}
                  >
                    <i class="fas fa-heart"></i>
                    {elem.favoritesCount}
                  </button>
                )}
              </div>
              <Link to={`articles/${elem.slug}`}>
                <h4 className="article_title"> {elem.title} </h4>
                <h5 className="article_description padding">
                  {elem.description}
                </h5>
              </Link>
              <Link to={`articles/${elem.slug}`}>Read more...</Link>
            </section>
          );
        })}
      </>
    );
  }
}
function mapState(state) {
  return { ...state };
}

export default connect(mapState)(Articles);
