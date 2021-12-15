import React from "react";
import {render,cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from "../Blog";

const mockBlog = [
    {title:'test', author:'test', likes:0, url:'test@test'}
]
beforeEach(()=>{
    cleanup()
})
describe('testing Blog component', ()=>{
    it('should only render title and author',()=>{
        const blog = render(<Blog blog={mockBlog}/>)
        const viewBtn = blog.container.querySelector('.viewBtn');
        expect(blog.container).toContainElement(viewBtn)
    })
    it('should show url and likes',()=>{
        const blog = render(<Blog blog={mockBlog}/>)
        const viewBtn = blog.container.querySelector('.viewBtn');
        fireEvent.click(viewBtn);
        const url = blog.getByTestId('url');
        const likes = blog.getByTestId('likes')
        expect(blog.container).toContainElement(url)
        expect(blog.container).toContainElement(likes)
    })
})