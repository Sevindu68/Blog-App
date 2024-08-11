import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "../components/Editor";
import Swal from 'sweetalert2'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setfiles] = useState("");

  const navigate=useNavigate()

  const createNewPost = async(e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    console.log(files);
    const response=await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials:'include'
    });

    if(response.ok)
      Swal.fire({
        title: "Post created successfully!",
        icon: "success"
      });
      navigate('/')
  };

  return (
    <div>
      <h1 className="title">Create a new blog </h1>
      <form onSubmit={createNewPost}>
        <input
          name="title"
          type="title"
          placeholder="Title"
          required
          value={title}
          maxLength={70}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          name="summary"
          type="summary"
          required
          placeholder="Summary"
          value={summary}
          maxLength={180}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <input
          name="image"
          type="file"
          required
          onChange={(e) => {
            setfiles(e.target.files);
          }}
        />
        <Editor onChange={setContent} value={content}/>
        <button className="post-btn">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
