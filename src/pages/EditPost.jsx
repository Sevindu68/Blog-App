import { React, useState, useEffect } from "react";
import Editor from "../components/Editor";
import { useParams,useNavigate } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setfiles] = useState("");
  const [cover,setCover]=useState("")

  const { id } = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((responce) => {
      responce.json().then((postInfo) => {
        console.log(postInfo);
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content)
      });
    });
  }, []);

  const updatePost = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if(files?.[0]){
      data.set("file", files?.[0]);
    }
    
    const response=await fetch(`http://localhost:4000/post`,{
      method:'PUT',
      body:data,
      credentials: 'include'
    })
    if(response.ok){
      navigate(`/post/${id}`)
    }
    

  };

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          name="title"
          type="title"
          placeholder="Title"
          value={title}
          maxLength={70}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          name="summary"
          type="summary"
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
          onChange={(e) => {
            setfiles(e.target.files);
          }}
        />
        <Editor onChange={setContent} value={content} />
        <button className="post-btn">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
