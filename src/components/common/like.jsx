import React from "react";

// Input: liked: boolean
// Output: onClick
// Raises an onClick event then renders empty or full hearts
// not related to movies
// This is a controlled component. Receives all data and notify changes via props
// We only have render method hence can convert to sfc
// pass props and delete 'this.'

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
