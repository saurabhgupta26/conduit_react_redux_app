import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {checkUser} from "../store/actions";

class Header extends React.Component {
  componentDidMount() {
    const url= "https://conduit.productionready.io/api/user";
    this.props.dispatch(checkUser(url));
  }
  render() {
    const { isLogged, userInfo } = this.props;
    return isLogged ? <AuthHeader userInfo={userInfo}  /> : <NonAuthHeader />;
  }
}
function NonAuthHeader() {
  return (
    <div className="flex">
      <Link className="logo" to="/">
        <h3>conduit</h3>
      </Link>
      <ul className="nav_bar">
        <div className="flex">
          <NavLink
            activeClassName="primary_btn"
            className="primary"
            to="/login"
          >
            <li>Sign In</li>
          </NavLink>
          <NavLink
            activeClassName="primary_btn"
            className="primary"
            to="/signup"
          >
            <li>Sign Up</li>
          </NavLink>
        </div>
      </ul>
    </div>
  );
}

function AuthHeader({userInfo}) {
  console.log(userInfo, "USERINFO");
  return (
    <>
      {userInfo  ? (
        <div className="flex container">
          {userInfo && console.log(userInfo.username)}
          <Link className="logo" to="/">
            <h3 to="/">conduit</h3>
          </Link>
          <ul className="nav_bar">
            <div className="flex  container">
              <NavLink activeClassName="primary_btn" className="primary" to="/">
                <li>Home</li>
              </NavLink>
              <NavLink
                activeClassName="primary_btn"
                className="primary"
                to="/create"
              >
                <li><i class="far fa-edit"></i>New Post</li>
              </NavLink>

              <NavLink
                activeClassName="primary_btn"
                className="primary"
                to={`/setting/${userInfo.username}`}
              >
                <li>Settings</li>
              </NavLink>
              <NavLink
                activeClassName="primary_btn"
                className="primary"
                to={`/profile/${userInfo.username}`}
              >
                <li className="flex">
                  <img
                    src={userInfo.image}
                    alt="prof"
                    className="author_img author_image"
                  />
                  {userInfo.username}
                </li>
              </NavLink>
            </div>
          </ul>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}
function mapState({isLogged,userInfo}) {
  return {isLogged,userInfo };
}
export default connect(mapState)(withRouter(Header));
