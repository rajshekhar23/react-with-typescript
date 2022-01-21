import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import PostsPage from './PostsPage';
import { renderWithReactQueryRouter } from 'utils/test-utils';
import axios from 'axios';
import { Post } from 'models/Post';

jest.mock('axios');

const axiosMock = axios as jest.Mocked<typeof axios>;

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Omar Little',
    body: 'Omar Little body',
    userId: 1
  },
];

const fetchMockPosts = () => {
  axiosMock.get.mockResolvedValueOnce({
    data: mockPosts,
  });
};

const fetchMockNoPosts = () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [],
  });
};

beforeEach(() => axiosMock.get.mockReset());

test('should find a post within the list', async () => {
  fetchMockPosts();
  renderWithReactQueryRouter(<PostsPage />, ['/']);

  const element = await waitFor(() => screen.getByText('Omar Little'));

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(element).toBeInTheDocument();
});

test('should display loading text while waiting for posts to load', async () => {
  fetchMockPosts();
  renderWithReactQueryRouter(<PostsPage />, ['/']);
  await waitFor(() => {
    expect(screen.getByText('Making posts...')).toBeInTheDocument();
  });
});

test('should display error message when no posts found', async () => {
  fetchMockNoPosts();
  renderWithReactQueryRouter(<PostsPage />, ['/']);

  const element = await waitFor(() => screen.getByText('No posts found :-('));

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(element).toBeInTheDocument();
});

test('should display error message when an error occurs while fetching posts', async () => {
  renderWithReactQueryRouter(<PostsPage />, ['/']);

  const element = await waitFor(() => screen.getByText('No posts found :-('));

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(element).toBeInTheDocument();
});
