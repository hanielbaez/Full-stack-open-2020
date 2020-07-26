import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

describe('<Blog/>', () => {
    let blog;

    beforeEach(() => {
        blog = {
            title: 'It is a good blog',
            author: 'Haniel Baez',
            url: 'www.hanielbaez.com',
            likes: 99
        }
    })

    test('blog only render blog\'s title and author', () => {
        const component = render(<Blog blogObject={blog} />)

        const titleElement = component.getByText('It is a good blog')
        const authorElement = component.getByText('Haniel Baez')

        expect(titleElement).toBeDefined()
        expect(authorElement).toBeDefined()

        const toggleVisibility = component.container.querySelector('.togglableContent')
        expect(toggleVisibility).toHaveStyle('display: none')
    })

    test('show blog\'s url and likes when button click', () => {
        const component = render(<Blog blogObject={blog} />)

        const button = component.getByText('view')
        fireEvent.click(button)

        const toggleVisibility = component.container.querySelector('.togglableContent')

        expect(toggleVisibility).not.toHaveStyle('display: none')
    })

    test('handle click like button', () => {
        const mockHandler = jest.fn()

        const component = render(<Blog blogObject={blog} forLikeTest={mockHandler} />)
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
