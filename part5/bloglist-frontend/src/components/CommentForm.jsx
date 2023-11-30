import { useDispatch } from "react-redux";
import blogReducer, { commentBlog } from "../reducers/blogReducer";
import errorReducer, { setError } from "../reducers/errorReducer";

const CommentForm = ({ blog }) => {
    const dispatch = useDispatch()
    const addComment = async (event) => {
        event.preventDefault();
        const commentToAdd = {
            id: blog.id,
            comment: event.target.Comment.value
        }
        event.target.Comment.value = ''
        try {
            dispatch(commentBlog(commentToAdd))
        } catch (error) {
            dispatch(setError(`Unable to add comment`, 5));
        }
    }
    return(
        <div>
            <form onSubmit={addComment}>
                <div>
                    <input type="text" name="Comment" className="comment" /><button>add comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm;