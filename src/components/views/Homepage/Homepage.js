import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { PostCard } from '../../features/PostCard/PostCard';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPublished } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';

const Component = ({ className, posts, user }) => {

  return (
    <div className={clsx(className, styles.root)}>

      <Container maxWidth="lg">
        {user.logged ?
          <Fab color="secondary" aria-label="add" href="/posts/add" className={styles.button}>
            <AddIcon />
          </Fab>
          : ''
        }

        {posts.map(el => (
          <PostCard key={el._id} data={el} />
        ))}

      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  getPublished: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getPublished(state),
  user: getUser(state),
});

// const mapDispatchToProps = (dispatch, state) => ({
//   fetchPublished: () => dispatch(fetchPublished(state)),
// });

const HomepageContainer = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};
