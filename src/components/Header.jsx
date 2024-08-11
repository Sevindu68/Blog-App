import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ImBlog } from "react-icons/im";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
      navigate("/");
    });
  };

  const id = userInfo?.id; // Updated line
  const username = userInfo?.username; // Updated line

  return (
    <header>
      <span className="logo">
        <Link to="/" className="logo">
          <ImBlog /> Blogify
        </Link>
      </span>

      <nav>
        {username ? (
          <div className="icons">
            <Link to="/create">
              <button className="btn add-post">Add new post</button>
            </Link>
            <Link to={`/profile/${id}`}>
              <button className="btn">profile</button>
            </Link>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn add-post">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn">Register </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
