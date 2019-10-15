import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog/>', () => {
  const blog = {
    title: 'Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    likes: 3,
    user: {
      name: 'Nuuska Muikkunen',
      username: 'nuuskamui'
    }
  }
  const user = {
    username: 'nuuskamui'
  }
  const mockHandler = jest.fn()

  test('renders blog\'s content only', () => {

    const component = render(
      <Blog blog={blog} likes={mockHandler} remove={mockHandler} user={user}/>
    )

    expect(component.container).toHaveTextContent(
      'Hitchhiker\'s Guide to the Galaxy Douglas Adams'
    )
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')

  })

  test('clicking blog title expands content', async () => {

    const component = render(
      <Blog blog={blog} likes={mockHandler} remove={mockHandler} user={user}/>
    )

    const titleDiv = component.getByText('Hitchhiker\'s Guide to the Galaxy Douglas Adams')

    fireEvent.click(titleDiv)


    const contentDiv = component.container.querySelector('.togglableContent')

    expect(contentDiv).not.toHaveStyle('display: none')
  })
})