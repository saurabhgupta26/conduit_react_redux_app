import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleSignin } from "../store/actions";
import { userInfo } from "../store/types";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/users/login";
    let userInfo = {...this.state};
    this.props.dispatch(handleSignin(url, userInfo, this.props.history))

  }
  render() {
    let { email, password, error } = this.state;
    return (
      <>
        <div className="signup_card">
          <h1>Sign In</h1>
          <a className="primary_color" href="/signup">
            Need an account?
          </a>
          <div className="flex flex2">
            <input
              className="form_field"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleInput}
              value={email}
            />
            <input
              className="form_field"
              type="password"
              name="password"
              placeholder="*****"
              onChange={this.handleInput}
              value={password}
            />
            <p>{error && error}</p>
            <button className="primary primary_btn" onClick={this.handleSubmit}>
              Log In
            </button>
          </div>
        </div>
      </>
    );
  }
}

function mapState(state) {
  return { ...state };
}

export default connect(mapState)(withRouter(Signin));
