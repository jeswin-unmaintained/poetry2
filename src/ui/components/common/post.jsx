import React, { Component } from "react";
import Like from './like'
import Comments from './comments'

export default ({ post }) => {
  return (
    <li
      className="post"
      style={{ backgroundImage: `url(${post.image})` || "none", backgroundColor: post.color || 'none', backgroundSize: "cover" }}
    >
      <ul className="lines">{post.lines.map(i => <li>{i}</li>)}</ul>
      <Like />
      <Comments postId = {post.id} />
    </li>
  );
};
