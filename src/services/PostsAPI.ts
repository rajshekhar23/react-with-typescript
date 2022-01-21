import { Post } from 'models/Post';
import {  POSTS_URL } from '../constants/urls';
import FetchAPI from './FetchAPI';

// fetched data using async and await as mentioned.
const PostsAPI = {
  getPosts: async () => {
    const posts: Post[] = await FetchAPI.get(POSTS_URL);
    return posts || [];
  },
};

export default PostsAPI;
