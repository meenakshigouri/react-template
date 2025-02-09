/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchItunesRepos={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunesRepos on empty change', async () => {
    const getItunesReposSpy = jest.fn();
    const clearItunesReposSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearItunesRepos={clearItunesReposSpy} dispatchItunesRepos={getItunesReposSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesReposSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesReposSpy).toBeCalled();
  });

  it('should call dispatchItunesRepos on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchItunesRepos={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
