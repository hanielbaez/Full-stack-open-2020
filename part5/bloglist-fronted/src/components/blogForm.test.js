import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'

test('form calls the event handler it received as props', () => {
    const mockHandler = jest.fn()
    const component = render(
        <BlogForm createBlog={mockHandler} />
    )

    const inputTitle = component.container.querySelector('.title')
    const inputAuthor = component.container.querySelector('.author')
    const inputUrl = component.container.querySelector('.url')

    const newBLog = {
        title: 'Keep going Haniel',
        author: 'Haniel Baez',
        url: 'www.hanielbaez.com'
    }

    fireEvent.change(inputTitle, {
        target: { value: newBLog.title }
    })
    fireEvent.change(inputAuthor, {
        target: { value: newBLog.author }
    })
    fireEvent.change(inputUrl, {
        target: { value: newBLog.url }
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(mockHandler.mock.calls[0][0]).toEqual (newBLog)
})