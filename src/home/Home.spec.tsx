import React from 'react'
import { render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Home from './index'

test('renders learn react link', () => {
  const { getByText } = render(
    <HashRouter>
      <Home />
    </HashRouter>,
  )
  const linkElement = getByText(/Browse repos that need support/i)
  expect(linkElement).toBeInTheDocument()
})
