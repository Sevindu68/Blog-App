import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((responce) => {
      responce.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div>
      <h1>{postInfo.title}</h1>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <span className="author-info">
        <time dateTime={postInfo.createdAt}>
          {format(new Date(postInfo.createdAt), "MMM d, yyyy | HH:mm")}
        </time>
        <span className="author">{postInfo.author.username}</span>
      </span>

      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
    </div>
  );
};

export default PostPage;
