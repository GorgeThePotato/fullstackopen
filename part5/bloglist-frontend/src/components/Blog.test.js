import React from "react"
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import LikeButton from "./LikeButton"
import BlogForm from "./BlogForm"

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing library',
        author: 'Jorge',
        url: 'google.com',
        likes: 10,
        user : {
            name: 'Jorge'
        }
    }
    const user = {
        name: 'Jorge'
    }
    const {container} = render(<Blog blog={blog} user={user}/>)
    const blogTitle = container.querySelector('.blog_title')
    expect(blogTitle).not.toHaveStyle('display: none')
    const blogAuthor = container.querySelector('.blog_author')
    expect(blogAuthor).not.toHaveStyle('display: none')
    const blogDetails = container.querySelector('.blog_details')
    expect(blogDetails).toHaveStyle('display: none')
})

test('on click, blog detials are showed', async () =>{
    const blog = {
        title: 'Component testing is done with react-testing library',
        author: 'Jorge',
        url: 'google.com',
        likes: 10,
        user : {
            name: 'Jorge'
        }
    }
    const blogUser = {
        name: 'Jorge'
    }
    const {container} = render(<Blog blog={blog} user={blogUser}/>)
    const user = userEvent.setup()
    const button = container.querySelector('.show_details')
    await user.click(button)
    const blogDetails = container.querySelector('.blog_details')
    expect(blogDetails).not.toHaveStyle('display: none')
})

test('on double like click, the handler is called twice', async () =>{

    const blog = {
        title: 'Component testing is done with react-testing library',
        author: 'Jorge',
        url: 'google.com',
        likes: 10,
        id: 1,
        user : {
            name: 'Jorge'
        }
    }
    const blogUser = {
        name: 'Jorge'
    }
    const updateLikes = jest.fn()
    const user = userEvent.setup()
    const {container} = render(<LikeButton blog={blog} updateLikes={updateLikes}/>)
    const button = container.querySelector('.like_button')
    await user.click(button)
    await user.click(button)
    expect(updateLikes.mock.calls).toHaveLength(2)
})

test('right props are received when blog form is submitted', async()=>{
    const createBlog = jest.fn()
    const user = userEvent.setup()
    const {container} = render(<BlogForm createBlog={createBlog}/>)
    const titleInput = container.querySelector('.title')
    const authorInput = container.querySelector('.author')
    const urlInput = container.querySelector('.url')
    const createButton = container.querySelector('.create_blog')

    await user.type(titleInput,'Blog title')
    await user.type(authorInput,'Jorge')
    await user.type(urlInput,'url')
    await user.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('Jorge')
    expect(createBlog.mock.calls[0][0].url).toBe('url')
})