import React from "react";
import Loading from "./Loading.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {checkUser} from "../store/actions";
import {isLogged, userInfo} from '../store/types';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      username: '',
      bio:'',
      email: '',
      password : '', 
    };
  }

  componentDidMount() {
    const url = "https://conduit.productionready.io/api/user";
    this.props.dispatch(checkUser(url));
    console.log(this.props);
  }

  handleInput = ({ target: { name, value } }) => {
    if (this.props.userInfo) {
      let userInfo = this.props.userInfo;
      userInfo[name] = value;
      this.setState({ userInfo });
    }
  };

  handleLogout = (history) => {
    return function (dispatch) {
      localStorage.removeItem("authToken");
      history.push(`/`);
      this.props.dispatch({ type: isLogged, payload: false });
      return this.props.dispatch({ type: userInfo, payload: null });
    };
  }
  

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ user: this.state.userInfo }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };
  render() {
    const {userInfo} = this.props;
    if (!userInfo) {
      return <Loading />;
    }
    let { image, username, bio, email, password } = userInfo;
    console.log("SETTING");
    return (
      <>
        <div className="signup_card">
          <h1>Your Settings</h1>
          <div className="flex flex2">
            <input
              className="form_field"
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={this.handleInput}
              value={image}
            />
            <input
              className="form_field"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleInput}
              value={username}
            />
            <input
              className="form_field"
              type="text"
              name="bio"
              placeholder="Short bio about you"
              onChange={this.handleInput}
              value={bio}
            />
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
            <input
              type="submit"
              value="Update Settings"
              className="primary primary_btn"
              onClick={this.handleSubmit}
            />
          </div>
          <hr />
          <button onClick={this.handleLogout(this.props.history)} className="primary logout">
            Or click here to logout.
          </button>
        </div>
      </>
    );
  }
}
function mapState(state) {
  console.log(state, "state");
  return { ...state };
}
export default (connect)(mapState)(withRouter(Setting));
