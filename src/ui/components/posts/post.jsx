import React, { Component } from "react";
import Like from "./like";
import Comments from "./comments";

export default ({ post, user }) => {
  return (
    <li
      className="post"
      style={{
        backgroundImage: `url(${post.image})` || "none",
        backgroundColor: post.color || "none",
        backgroundSize: "cover"
      }}>
      <ul className="lines">{post.lines.split("\n").map(i => <li>{i}</li>)}</ul>
      <Like postId={post.id} userId={user.id} />
      <Comments postId={post.id} user={user} />
    </li>
  );
};