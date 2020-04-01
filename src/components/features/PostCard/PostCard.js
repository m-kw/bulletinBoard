import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostCard.module.scss';

const Component = ({ className, data }) => (

  <div className={clsx(className, styles.root)}>
    <Card className={styles.card}>
      <CardHeader title={data.title} subheader={`${data.created}/${data.updated}`} />
      <CardActions className={styles.link}>
        <Button size="small" color="secondary" variant="contained" href={`/posts/${data._id}`}>
          Show details
        </Button>
      </CardActions>
    </Card>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostCard,
  // Container as PostCard,
  Component as PostCardComponent,
};
