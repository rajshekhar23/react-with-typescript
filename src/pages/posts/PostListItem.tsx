import React from 'react';
import styled from 'styled-components/macro';
import { colours } from 'constants/colours';
import { Post } from 'models/Post';
import { Edit } from 'styled-icons/material-sharp';
import IconButton from 'components/IconButton';

interface Props {
  post: Post;
  handleOnEdit: (post: Post) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  margin: 6px 0px;
  min-height: 3rem;
`;

const PostDetailsContainer = styled.div`
  display: flex;
  width: 90%;
  background-color: ${colours.grey};
  flex-direction: column;  
  border-radius: 4px;
  padding: 10px 10px 10px 15px;

`;

const PostName = styled.span`
  color: ${colours.navy};
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const PostBody = styled.span`
  color: ${colours.navy};
  font-size: 0.7rem;
  font-weight: 500;
  margin-bottom: 4px;
`;


const PostListItem = ({ post, handleOnEdit }: Props) => {
  return (
    <Container>
      <PostDetailsContainer>
        <PostName><b>Title : </b> {post.title}</PostName>
        <PostBody><b>Body : </b> {post.body}</PostBody> 
      </PostDetailsContainer>
      <IconButton icon={Edit} onClick={() => handleOnEdit(post)}/>
    </Container>
  );
};

export default PostListItem;
