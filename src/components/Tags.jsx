import React from "react";
// import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import "./App.css";
import { fetchTag, handleTags } from "../store/actions";

class Tags extends React.Component {
  componentDidMount() {
    // If login, user data
    // if (localStorage.authToken) {
    //   let url = "https://conduit.productionready.io/api/user";
    //   fetch(url, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Token ${localStorage.authToken}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then(({ user }) => {
    //       this.setState({ isLoggedIn: true, userInfo: user });
    //     })
    //     .catch((err) => this.setState({ isLoggedIn: false }));
    // }

    // Tags
    const url = "https://conduit.productionready.io/api/tags";
    this.props.dispatch(fetchTag(url));
  }

  render() {
    const { tags, articles } = this.props;
    return (
      <div className="tags_card">
        <h4>Popular Tags</h4>
        {tags.map((tag) => {
          return (
            <>
              <button
                className="btn_tags"
                onClick={() => this.props.dispatch(handleTags(tag))}
              >
                {tag}
              </button>
            </>
          );
        })}
        <button>{articles.length}</button>
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}
export default connect(mapState)(Tags);
