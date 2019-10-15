import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

  })

  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'nuuskamui',
      token: '1231231214',
      name: 'Nuuska Muikkunen'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)

  })
})