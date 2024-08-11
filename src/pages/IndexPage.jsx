import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (<div className="main-container">
    <div className="container">{posts && posts.map((post) => <Post key={post._id} {...post} profile={false}/>)}</div>
  </div>)
  
  
};

export default IndexPage;
