import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import { colours } from 'constants/colours';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  html, #root {
    height: 100%;
    background-color: ${colours.offWhite};
  }

  body {
    height: 100%;
    margin: 0;
    font-family: 'Inter', 'system-ui', '-apple-system', sans-serif;
  }
`;

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.Fragment>
      <Router basename={process.env.PUBLIC_URL}>
        <Route path="/" component={App}></Route>
      </Router>
      <GlobalStyle />
    </React.Fragment>
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>,
  document.getElementById('root'),
);
