import React from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <h1>Create Post!</h1>
      <PostForm></PostForm>
      <hr></hr>
      <PostList></PostList>
    </div>
  );
};

export default App;
