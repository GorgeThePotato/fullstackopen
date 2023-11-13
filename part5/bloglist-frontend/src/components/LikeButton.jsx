const LikeButton = ({blog,updateLikes}) => {

    const updateBlog = (blog) => {
        updateLikes({
            id: blog.id,
            likes: blog.likes
        })
    }

    return(
        <button key={blog.id} onClick={() =>updateBlog(blog)} className='like_button'>like</button>
    )
}
export default LikeButton