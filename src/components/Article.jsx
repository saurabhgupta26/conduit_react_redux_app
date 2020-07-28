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
    let {body} = this.state;
    return (
      <>
        {loadArticle.author ? (
          <section>
            <h2>{loadArticle.title}</h2>
            {console.log(loadArticle, "LOADARTICLE")}
            <Link
              className="article_author"
              to={`/profile/${loadArticle.author.username}`}
            >
              <img
                className="user_image"
                src={loadArticle.author.image}
                alt="img"
              />
              <h2>{loadArticle.author.username}</h2>
              <p>{loadArticle.createdAt}</p>
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

            <p>{loadArticle.body}</p>
            <h1>{loadArticle.tagList}</h1>
          </section>
        ) : (
          <Loading />
        )}
        {loadComment ? (
          loadComment.map((elem) => {
            return (
              <>
                <h2> {elem.body} </h2>
                <p>{elem.createdAt.split("T", [1])}</p>
              </>
            );
          })
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
            <input
              type="submit"
              value="Post Comment"
              className="primary primary_btn"
              onClick={this.handleSubmit}
            />
          </div>
        ) : (
          <> </>
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
