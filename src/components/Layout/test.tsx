import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Layout from '../Layout'
import React from 'react'

describe('<Layout />', () => {
  it('renders children correctly', () => {
    const testId = 'child-component'
    const ChildComponent = () => <div data-testid={testId}>Test Child</div>

    render(
      <Layout>
        <ChildComponent />
      </Layout>
    )

    const childElement = screen.getByTestId(testId)
    expect(childElement).toBeInTheDocument()
  })
})
