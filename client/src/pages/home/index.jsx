import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchListOfBlogs = async () => {
    setPending(true);
    const response = await axios.get("http://localhost:3000/api/blogs");
    const result = await response.data;
    console.log(result.length);
    if (result && result.length) {
      setBlogList(result);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  };
  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:3000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;
    if (result?.message) {
      fetchListOfBlogs();
      // navigate(0);
    }
  }
  function handleEdit(getCurrentBlogItem) {
    console.log(getCurrentBlogItem);
    navigate("/add-blog/", { state: { getCurrentBlogItem } });
  }
  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  console.log(pending, blogList);
  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs ! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit size={30} onClick={() => handleEdit(blogItem)} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <div style={{ margin: "0 auto", width: "100%" }}>
              Blog not added yet!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
