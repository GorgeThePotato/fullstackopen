import { useDispatch } from "react-redux";
import errorReducer, { setError } from "../reducers/errorReducer";
import blogReducer, { deleteBlog } from "../reducers/blogReducer";
const RemoveButton = ({ blog }) => {
  const dispatch = useDispatch();
  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog));
      } catch (error) {
        dispatch(setError(`Unable to delete the blog`, 5));
      }
    }
  };
  return (
    <button key={blog.id} onClick={() => removeBlog(blog)}>
      remove
    </button>
  );
};
export default RemoveButton;
