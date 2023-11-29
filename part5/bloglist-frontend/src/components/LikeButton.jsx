import { useDispatch } from "react-redux";
import blogReducer, { likeBlog } from "../reducers/blogReducer";
import errorReducer, { setError } from "../reducers/errorReducer";

const LikeButton = ({ blog }) => {
  const dispatch = useDispatch();

  const updateBlog = async (blog) => {
    const blogToUpdate = {
      id: blog.id,
      likes: blog.likes,
    };
    try {
      dispatch(likeBlog(blogToUpdate));
    } catch (error) {
      dispatch(setError(`Unable to like the blog`, 5));
    }
  };

  return (
    <button
      key={blog.id}
      onClick={() => updateBlog(blog)}
      className="like_button"
    >
      like
    </button>
  );
};
export default LikeButton;
