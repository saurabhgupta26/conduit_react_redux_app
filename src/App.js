import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header.jsx";
import Wholepage from "./components/Wholepage.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Error from "./components/Error.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import Setting from "./components/Setting.jsx";
import Article from "./components/Article.jsx";
import User from "./components/User.jsx";
import EditArticle from "./components/EditArticle.jsx";
import "./App.css";
import { checkUser } from "./store/actions";
import { SHOW_ARTICLES } from "./store/types";
// import Tags from "./components/Tags";

class App extends React.Component {
  componentDidMount() {
    // CHECK USER
    const url = "https://conduit.productionready.io/api/user";
    this.props.dispatch(checkUser(url));
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
              <Wholepage
                handleFavourite={this.handleFavourite}
                handleUnfavourite={this.handleUnfavourite}
              />
            )}
            path="/"
            exact
          />
          <Route
            render={() => <Signin updateLoggedIn={this.updateLoggedIn} />}
            path="/login"
            exact
          />
          <Route component={EditArticle} path="/articles/:slug/edit" />
          <Route
            render={() => (
              <User
                handleFavourite={this.handleFavourite}
                handleUnfavourite={this.handleUnfavourite}
              />
            )}
            path="/profile/:profileSlug"
          />
          <Route render={() => <Article />} path="/articles/:slug" />
          <Route render={() => <Setting />} path="/setting/:profileSlug/" />
          <Route component={Signup} path="/signup" />
          <Route component={CreateArticle} path="/create" />
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
