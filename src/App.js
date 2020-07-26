import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { SHOW_ARTICLES, SHOW_TAGS } from "./store/types";
import Tags from "./components/Tags";

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
  }

  render() {
    const { articles } = this.props;
    return (
      // <BrowserRouter>
      //   <Header isLoggedIn={isLoggedIn} userInfo={userInfo} />
      //   <Switch>
      //     <Route
      //       render={() => (
      //         <Wholepage
      //           articles={this.state.articles}
      //           tags={this.state.tags}
      //           handleClick={this.handleClick}
      //           handleGlobal={this.handleGlobal}
      //           handleFeed={this.handleFeed}
      //           userInfo={this.state.userInfo}
      //           handleFavourite={this.handleFavourite}
      //           handleUnfavourite={this.handleUnfavourite}
      //         />
      //       )}
      //       path="/"
      //       exact
      //     />
      //     <Route
      //       render={() => <Signin updateLoggedIn={this.updateLoggedIn} />}
      //       path="/login"
      //       exact
      //     />
      //     <Route component={EditArticle} path="/articles/:slug/edit" />
      //     <Route
      //       render={() => (
      //         <User
      //           articles={this.state.articles}
      //           handleFavourite={this.handleFavourite}
      //           handleUnfavourite={this.handleUnfavourite}
      //         />
      //       )}
      //       path="/profile/:profileSlug"
      //     />
      //     <Route
      //       render={() => <Article userInfo={this.state.userInfo} />}
      //       path="/articles/:slug"
      //     />
      //     <Route
      //       render={() => <Setting handleLogout={this.handleLogout} />}
      //       path="/setting/:profileSlug/"
      //     />
      //     <Route component={Signup} path="/signup" />
      //     <Route component={CreateArticle} path="/create" />
      //     <Route component={Error} />
      //   </Switch>
      // </BrowserRouter>
      <div className="">
        <ul>
          {tags.map((tag) => {
            return (
              <li>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </li>
            );
          })}
        </ul>
        <Tags />
      </div>
    );
  }
}
function mapState({ articles }) {
  return { articles };
}
export default connect(mapState)(withRouter)(App);
