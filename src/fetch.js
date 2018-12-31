// __tests__/fetch.js
import React from 'react'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect'

// the mock lives in a __mocks__ directory
// to know more about manual mocks, access: https://jestjs.io/docs/en/manual-mocks
import axiosMock from 'axios'
import Fetch from '../fetch' // see the tests for a full implementation

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

test('Fetch makes an API call and displays the greeting when load-greeting is clicked', async () => {
  // Arrange
  axiosMock.get.mockResolvedValueOnce({data: {greeting: 'hello there'}})
  const url = '/greeting'
  const {getByText, getByTestId, container, asFragment} = render(
    <Fetch url={url} />,
  )

  // Act
  fireEvent.click(getByText('Load Greeting'))

  // Let's wait until our mocked `get` request promise resolves and
  // the component calls setState and re-renders.
  // getByTestId throws an error if it cannot find an element with the given ID
  // and waitForElement will wait until the callback doesn't throw an error
  const greetingTextNode = await waitForElement(() =>
    getByTestId('greeting-text'),
  )

  // Assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(getByTestId('greeting-text')).toHaveTextContent('hello there')
  expect(getByTestId('ok-button')).toHaveAttribute('disabled')
  // snapshots work great with regular DOM nodes!
  expect(container.firstChild).toMatchSnapshot()
  // you can also use get a `DocumentFragment`, which is useful if you want to compare nodes across render
  expect(asFragment()).toMatchSnapshot()
})