import { useState } from "react"

const BlogForm = ({createBlog}) => {
    const [title,setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    
    return(
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input 
                    type="text" 
                    value={title}
                    name='Title'
                    onChange={({target}) =>setTitle(target.value)}
                    className='title'/>
                </div>
                <div>
                    author
                    <input type="text" 
                    value={author}
                    name='Author'
                    onChange={({target}) =>setAuthor(target.value)}
                    className='author'/>
                </div>
                <div>
                    url
                    <input type="text" 
                    value={url}
                    name='Url'
                    onChange={({target}) =>setUrl(target.value)}
                    className='url'/>
                </div>
                <button type='submit' className='create_blog'>create</button>
            </form>
        </div>
    )
}

export default BlogForm