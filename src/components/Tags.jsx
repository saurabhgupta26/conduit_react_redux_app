import React from "react";
// import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import "./App.css";
import { fetchTag, handleTags } from "../store/actions";

class Tags extends React.Component {
  componentDidMount() {
    // Tags
    const url = "https://conduit.productionready.io/api/tags";
    this.props.dispatch(fetchTag(url));
  }

  render() {
    const { tags } = this.props;
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
      </div>
    );
  }
}

function mapState(state) {
  return { ...state };
}
export default connect(mapState)(Tags);
