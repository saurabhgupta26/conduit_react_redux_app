import React from "react";
import Articles from "./Articles";
import Tags from "./Tags.jsx";
import Feed from "./Feed.jsx";
import Loading from "./Loading.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function Wholepage(props) {
  return (
    <>
      {!props.userInfo ? (
        <div className="container1">
          <section className="hero_section">
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </section>
        </div>
      ) : (
        <> </>
      )}

      <div className="container">
        <div className="flex">
          <div className="feed_block articles_flex_card">
            <Feed
              handleFeed={props.handleFeed}
              handleGlobal={props.handleGlobal}
              userInfo={props.userInfo}
            />
            {props.articles ? (
              <div>
                <Articles
                  // articles={this.props.dispatch(articles)}
                  handleFavourite={props.handleFavourite}
                  handleUnfavourite={props.handleUnfavourite}
                />
              </div>
            ) : (
              <Loading />
            )}
          </div>
          {props.tags ? (
            <div className="tags_flex_card">
              <Tags tags={props.tags} handleClick={props.handleClick} />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
function mapState(state) {
  return { ...state };
}
export default connect(mapState)(withRouter(Wholepage));
