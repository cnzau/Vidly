import React, { Component } from "react";

// Input: liked: boolean
// Output: onClick
// Raises an onClick event then renders empty or full hearts
// not related to movies

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      />
    );
  }
}

export default Like;
