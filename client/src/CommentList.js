import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "rejected") {
      content = "This comment was moderated";
    }
    if (comment.status === "pending") {
      content = "This comment is pending moderation";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
