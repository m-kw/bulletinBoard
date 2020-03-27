import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';

import styles from './NavBar.module.scss';

const Component = ({ className, title, user }) => (
  <div className={clsx(className, styles.root)}>
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>

        {user.logged ?
          <div className={styles.menu}>
            <Button color="inherit" href="/user-posts">My posts</Button>
            <Button color="inherit" href="/">Logout</Button>
          </div>
          : <Button color="inherit" href="https://google.com" className={styles.login}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as NavBar,
  Container as NavBar,
  Component as NavBarComponent,
};
