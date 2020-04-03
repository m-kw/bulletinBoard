import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';
import { UserPosts } from './components/views/UserPosts/UserPosts';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from './redux/postsRedux.js';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#130f40' },
    secondary: { main: '#f9ca24' },
  },
});

class App extends React.Component {

  static propTypes = {
    fetchPublished: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchPublished();
  }

  render() {
    return (
      <BrowserRouter>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/posts/add' component={PostAdd} />
                <Route exact path='/posts/:id' component={Post} />
                <Route exact path='/posts/:id/edit' component={PostEdit} />
                <Route exact path='/user-posts' component={UserPosts} />
                <Route path='*' component={NotFound} />
              </Switch>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    );

  }
}

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = (dispatch, state) => ({
  fetchPublished: () => dispatch(fetchPublished(state)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export {
  Container as App,
};
