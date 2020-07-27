import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArticle } from "../store/actions";

class Articles extends React.Component {
  componentDidMount() {
    const url =
      "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    this.props.dispatch(fetchArticle(url));
  }
  render() {
    const { articles } = this.props;
    return (
      <>
        {articles.map((elem, i) => {
          return (
            <section className="article_top" key={i}>
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
                    onClick={(e) => this.props.handleFavourite(elem.slug, e)}
                    key={i}
                  >
                    <i class="fas fa-heart"></i>
                    {elem.favoritesCount}
                  </button>
                ) : (
                  <button
                    className="favorite_count"
                    onClick={(e) => this.props.handleUnfavourite(elem.slug, e)}
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
