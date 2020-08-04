import React, { Component } from "react";
import { connect } from "react-redux";
import { handlePersonalFeed, handleGlobalFeed } from "../store/actions";

class Feed extends Component {
  handleFeed = () => {
    let url =
      "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0";
    this.props.dispatch(handlePersonalFeed(url));
  };
  handleGlobal = () => {
    let url = `https://conduit.productionready.io/api/articles?limit=10&offset=0`;
    this.props.dispatch(handleGlobalFeed(url));
  };
  render() {
    return (
      <div className="feeds_nav">
        <div className="flex flex1">
          {this.props.userInfo ? (
            <button onClick={this.handleFeed} className="feed_btn">
              Your Feed
            </button>
          ) : (
            <> </>
          )}
          <button onClick={this.handleGlobal} className="feed_btn active_feed">
            Global Feed
          </button>
        </div>
      </div>
    );
  }
}
function mapState(state) {
  console.log(state);
  return { ...state };
}
export default connect(mapState)(Feed);
