import React from 'react';
import Page from 'components/Page';
import PostsList from './PostsList';

const PostsPage = () => {
  return (
    <Page heading="Posts Listing">      
      <PostsList />
    </Page>
  );
};

export default PostsPage;
