import { useDispatch } from "react-redux";
import errorReducer, { setError } from "../reducers/errorReducer";
import blogReducer, { addBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const createBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value,
    };
    event.target.Title.value = "";
    event.target.Author.value = "";
    event.target.Url.value = "";
    try {
      dispatch(addBlog(newBlog));
    } catch (error) {
      dispatch(setError(`Unable to add blog`, 5));
    }
  };

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title
          <input type="text" name="Title" className="title" />
        </div>
        <div>
          author
          <input type="text" name="Author" className="author" />
        </div>
        <div>
          url
          <input type="text" name="Url" className="url" />
        </div>
        <button type="submit" className="create_blog">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
