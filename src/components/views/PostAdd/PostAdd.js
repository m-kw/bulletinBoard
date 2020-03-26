import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';
import { CardHeader } from '@material-ui/core';

const Component = ({ className }) => {

  const titleProps = {
    minLength: 10,
  };

  const contentProps = {
    minLength: 20,
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted');
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="lg">
        <Card className={styles.card}>
          <CardHeader title="Add new post" />
          <form className={styles.form} autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <TextField id="title" label="Title" inputProps={titleProps} required />
            <TextField id="price" label="Price" />
            <TextField variant="outlined" multiline id="content" inputProps={contentProps} label="Content" placeholder="Write your post here" rows="10" required />
            <TextField id="mail" label="E-mail" type="email" required />
            <TextField id="phone" label="Phone number" />
            <Button type="submit" color="secondary" variant="contained" className={styles.button}>Save</Button>
            <Button color="secondary" href="/" variant="contained" className={styles.button}>Return</Button>
          </form>
        </Card>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
