import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header.jsx";
import Wholepage from "./components/Wholepage.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Error from "./components/Error.jsx";
// import Article from "./components/Article.jsx";
import "./App.css";
import { fetchArticle } from "./store/actions";
// import Tags from "./components/Tags";

class App extends React.Component {
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
    // Articles
    // const url = "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    // this.props.dispatch(fetchArticle(url));
  }

  render() {
    console.log(this.props);
    // const { articles } = this.props;
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            render={() => (
              <Wholepage />
            )}
            path="/"
            exact
          />
          <Route
            render={() => <Signin updateLoggedIn={this.updateLoggedIn} />}
            path="/login"
            exact
          />
          {/* <Route component={EditArticle} path="/articles/:slug/edit" /> */}
          {/* <Route
            render={() => (
              <User
                articles={this.state.articles}
                handleFavourite={this.handleFavourite}
                handleUnfavourite={this.handleUnfavourite}
              />
            )}
            path="/profile/:profileSlug"
          /> */}
          {/* <Route
            render={() => <Article userInfo={this.state.userInfo} />}
            path="/articles/:slug"
          /> */}
          {/* <Route
            render={() => <Setting handleLogout={this.handleLogout} />}
            path="/setting/:profileSlug/"
          /> */}
          <Route component={Signup} path="/signup" />
          {/* <Route component={CreateArticle} path="/create" /> */}
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
function mapState({ articles }) {
  return { articles };
}
export default connect(mapState)(App);
