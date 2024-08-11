import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'


const Post = ({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  profile,
  onDelete,
}) => {
  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      Swal.fire({
        title: "Post deleted successfully!",
        icon: "success"
      });
      onDelete(); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="post">
      <div className="img">
        <Link to={`/post/${_id}`}>
          <img
            className="img"
            src={"http://localhost:4000/" + cover}
            alt="Post cover"
          />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <span className="author">{author?.username || "Unknown Author"}</span>
          <time dateTime={createdAt}>
            {format(new Date(createdAt), "MMM d, yyyy | HH:mm")}
          </time>
        </p>
        <p className="summary">{summary}</p>
        {profile && (
          <>
            <div className="profile-icons">
              <Link to={`/edit/${_id}`}>
                <span className="edit-icon">
                  <MdEdit size={20} />
                </span>
              </Link>

              <span onClick={deletePost} className="edit-icon">
                <MdDelete size={20} />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
