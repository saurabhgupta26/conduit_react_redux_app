import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { SHOW_ARTICLES, SHOW_TAGS } from "./store/types";

class App extends React.Component {
  componentDidMount() {
    // If login, user data
    if (localStorage.authToken) {
      let url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => {
          this.setState({ isLoggedIn: true, userInfo: user });
        })
        .catch((err) => this.setState({ isLoggedIn: false }));
    }
    // Articles
    fetch("https://conduit.productionready.io/api/articles?limit=10&offset=0")
      .then((res) => res.json())
      .then(({ articles }) => {
        this.props.dispatch(SHOW_ARTICLES(articles));
      });

    // Tags
    fetch(`https://conduit.productionready.io/api/tags`)
      .then((response) => response.json())
      .then(({tags}) => this.props.dispatch(SHOW_TAGS({ tags })));
  }

  render() {
    const {articles} = this.props;
    return (
      const {articles} = this.props
    );
  }
}

function mapState({articles}) {
  return { articles };
}
export default connect(mapState)(withRouter)(App);
