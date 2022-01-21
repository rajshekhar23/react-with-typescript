import React, { useState } from 'react';
import styled from 'styled-components/macro';
import PostListItem from './PostListItem';
import PostsAPI from 'services/PostsAPI';
import { Post } from 'models/Post';
import { useQuery } from 'react-query';
import { AddBox, Edit } from 'styled-icons/material';
import IconButton from 'components/IconButton';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  list-style: none;
  padding: 0;
`;

const Input = styled.input`
    width: 100%;
    height: 30px;
    margin: 12px 0px;
    border: 1px solid rgba(55, 25, 25, 0.2);
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 30px;
    margin: 12px 0px;
    border: 1px solid rgba(55, 25, 25, 0.2);
    height: 120px;
`;

const Form = styled.div`
  width: 600px;
  padding: 20px;
  border: 1px solid rgba(55, 25, 25, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DEFAULT_POST: Post = {
  id: undefined,
  userId: undefined,
  title: '', 
  body: ''
};

const PostsList = () => {  
  const [posts, setPosts] = React.useState<Post[]>(useQuery('postsData', PostsAPI.getPosts).data?.slice(0,5) || []);

  const [post, setPost] = React.useState<Post>(DEFAULT_POST);
  const [isEdit, setIsEdit] = useState(false);

  const renderPosts = () => {
    if (posts?.length === 0) {
      return <span>No posts found :-(</span>;
    }

    return posts?.map((post: Post) => (
      <li key={post.id}>
        <PostListItem post={post} handleOnEdit={handleOnEdit} />
      </li>
    ));
  };

  const handleOnEdit = (post: Post) => {
    setPost(post);
    setIsEdit(true);
  }

  const handleOnChange = (e: any) => {
    const {name, value} = e.target;
    setPost({...post,[name]: value, userId: 1});
  } 

  const handleAddPost = () => {
    if(isEdit) {
      const editDetails = posts.map((item) => item.id === post.id ? ({...item, ...post}) : item );
      setPosts(editDetails)
    } else {
    const newPost = {...post, id: posts.length + 1};
    setPosts([...posts, newPost]);
    }
    setPost(DEFAULT_POST)
    setIsEdit(false);
  }

  return (
  <div>
    <Form>
      <Input type="text" name="title" value={post?.title} onChange={handleOnChange} placeholder="Enter Post Title" />
      <TextArea name="body" value={post?.body} onChange={handleOnChange} placeholder="Enter Post body/description" />
      { isEdit ? <IconButton icon={Edit} tooltip='EDIT POST' onClick={handleAddPost} size={26} /> 
      : <IconButton icon={AddBox} tooltip='ADD POST' onClick={handleAddPost} size={26} /> }
    
    </Form>
    <List>{renderPosts()}</List>
  </div>
  );
};

export default PostsList;
