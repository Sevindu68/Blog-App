import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Post from "../components/Post";

const Profile = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null); 
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/view/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo); 
      });
    });
  }, [id, update]);

  const handleDelete = () => {
    setUpdate(!update);
  };

  return (
    <div>
      <h1 className="title">Welcome to the Profile 👏</h1>
      {postInfo === null ? ( 
        <div>Loading...</div> 
      ) : postInfo.length > 0 ? (
        <div>
          {postInfo.map((post) => (
            <Post
              key={post._id}
              {...post}
              profile={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <center>
          <div className="empty-post">
            <span>
              You haven't published any post yet{" "}
              <Link to={"/create"}>
                <button className="btn add-post">Create Now</button>
              </Link>
            </span>
          </div>
        </center>
      )}
    </div>
  );
};

export default Profile;
