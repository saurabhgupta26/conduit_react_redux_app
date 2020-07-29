import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadArticle } from "../store/actions";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: null,
      commentData: null,
      body: "",
    };
  }

  componentDidMount() {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}`;
    this.props.dispatch(loadArticle(url, articleId));
  }
  componentDidUpdate(prevProps, prevState) {}

  handleDelete = () => {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}/comments`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ body: this.state.body }),
    }).then((res) => {
      if (res.status === 200 && console.log(res.status)) {
        this.props.history.push(`/articles/${articleId}`);
      }
    });
  };

  render() {
    let { loadArticle, loadComment, userInfo } = this.props;
    // console.log(loadArticle, "whole state");
    let { body } = this.state;
    return (
      <>
        {loadArticle.author ? (
          <section>
            <div className="article_title">
              <h2>{loadArticle.title}</h2>
              <Link
                className="article_author"
                to={`/profile/${loadArticle.author.username}`}
              >
                <div className="flex flex1">
                  <img
                    className="user_image"
                    src={loadArticle.author.image}
                    alt="img"
                  />
                  <div>
                    <h3>{loadArticle.author.username}</h3>
                    <p>{loadArticle.createdAt.split("T")[0]}</p>
                  </div>
                </div>
              </Link>

              {this.props.userInfo &&
              this.props.loadArticle.author.username ===
                this.props.userInfo.username ? (
                <>
                  <Link to={`/articles/${this.props.match.params.slug}/edit`}>
                    Edit Article
                  </Link>
                  <Link onClick={this.handleDelete}>Delete Article</Link>
                </>
              ) : (
                <> </>
              )}
            </div>
            <p className="article_body">{loadArticle.body}</p>
            <h1>{loadArticle.tagList}</h1>
            <hr className="hr" />
          </section>
        ) : (
          <Loading />
        )}

        {userInfo ? (
          <div className="comment_card">
            <input
              type="text"
              name="body"
              onChange={this.handleInput}
              placeholder="Write a comment..."
              value={body}
              className="comment_field"
            />
            <div className="flex">
              <img
                src={userInfo.image}
                alt="prof"
                className="author_img author_image cmnt_author"
              />
              <input
                type="submit"
                value="Post Comment"
                className="primary primary_btn"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        ) : (
          <> </>
        )}

        {loadComment ? (
          loadComment.map((elem) => {
            return (
              <>
                <div className="comments_card">
                  <h2> {elem.body} </h2>
                  <div className="flex flex1">
                    <img
                      className="author_image author_img cmnt_author"
                      src={elem.author.image}
                    />
                    <p className='comment_author'>{elem.author.username}</p>
                    <p>{elem.createdAt.split("T", [1])}</p>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <Loading />
        )}

        {!userInfo ? (
          <h4>
            <a href="/login" className="primary_color">
              Sign in
            </a>
            or
            <a href="/signup" className="primary_color">
              sign up
            </a>
            to add comments on this article.
          </h4>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function mapState(state) {
  console.log(state);
  return { ...state };
}
export default connect(mapState)(withRouter(Article));
