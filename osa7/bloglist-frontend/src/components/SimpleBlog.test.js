/*eslint no-unused-vars:0*/
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

/*eslint no-undef:0*/
afterEach(cleanup)

describe('<SimbleBlog/>', () => {
  const blog = {
    title: 'Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    likes: 3
  }
  test('renders simpleblog\'s content', () => {

    const component = render(
      <SimpleBlog blog={blog} />
    )
    const header = component.container.querySelector('.blogHeader')
    console.log(prettyDOM(header))
    expect(header).toHaveTextContent(
      'Hitchhiker\'s Guide to the Galaxy Douglas Adams'
    )

    const blogLikes = component.container.querySelector('.blogLikes')
    console.log(prettyDOM(blogLikes))
    expect(blogLikes).toHaveTextContent(
      'blog has 3 likes'
    )
  })

  test('clicking the likes button twice calls event handler twice', async () => {

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})