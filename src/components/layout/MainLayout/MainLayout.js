import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../Header/Header';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { fetchPublished } from '../../../redux/postsRedux.js';

import styles from './MainLayout.module.scss';

const Component = ({ children, className, posts }) => {

  return (
    <div className={clsx(className, styles.root)}>
      <Header />
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.object,
  fetchPublished: PropTypes.func,
};

// const mapDispatchToProps = (dispatch, state) => ({
//   fetchPublished: () => dispatch(fetchPublished(state)),
// });

// const Container = connect(null, mapDispatchToProps)(Component);

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
