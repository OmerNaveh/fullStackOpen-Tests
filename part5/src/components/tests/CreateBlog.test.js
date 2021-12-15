import React from "react";
import {render,cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreatBlog from "../CreateBlog";

beforeEach(()=>{
    cleanup()
})
test('should be able to change input value',()=>{
    const form = render(<CreatBlog />)
    const title = form.getByTestId('title')
    fireEvent.change(title,{ 
        target: { value: 'test' } 
      });
    expect(title.value.length).toBe(4)
})