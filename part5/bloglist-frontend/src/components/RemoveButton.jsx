const RemoveButton = ({ blog, deleteBlog }) => {

    const removeBlog = (blog) => {
        if(window.confirm(`Remove blo ${blog.title} by ${blog.author}`)){
            deleteBlog(blog)
        }
    }
    return(
        <button key={ blog.id } onClick={() => removeBlog(blog)}>remove</button>
    )
}
export default RemoveButton