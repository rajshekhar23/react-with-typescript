import React from 'react';
import styled from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom';
import PostsPage from 'pages/posts/PostsPage';

const Container = styled.main`
  grid-area: content;
  display: flex;
  flex: 1;
  margin: 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <PostsPage />
        </Route>        
      </Switch>
    </Container>
  );
};

export default Routes;
