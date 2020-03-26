import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import shortid from 'shortid';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className }) => {

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = day + '/' + month + '/' + year;

  const titleProps = {
    minLength: 10,
  };

  const contentProps = {
    minLength: 20,
  };

  const [post, setPost] = React.useState({
    id: shortid.generate(),
    date: date,
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted');
  };

  const handleChange = (event, name) => {
    setPost({
      ...post,
      [name]: event.target.value,
    });
  };

  console.log('post', post);

  return (
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="lg">

        <Card className={styles.card}>

          <CardHeader title="Add new post" />

          <form className={styles.form} autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <TextField
              id="title"
              label="Title"
              required
              inputProps={titleProps}
              value={post.title}
              onChange={e => handleChange(e, 'title')}
            />
            <TextField
              id="price"
              label="Price"
              type="number"
              value={post.price}
              onChange={e => handleChange(e, 'price')}
            />
            <TextField
              variant="outlined"
              multiline
              id="content"
              inputProps={contentProps}
              label="Content"
              placeholder="Write your post here"
              rows="10"
              required
              value={post.content}
              onChange={e => handleChange(e, 'content')}

            />
            <TextField
              id="mail"
              label="E-mail"
              type="email"
              required
              value={post.mail}
              onChange={e => handleChange(e, 'mail')}
            />
            <TextField
              id="phone"
              label="Phone number"
              type="number"
              value={post.phone}
              onChange={e => handleChange(e, 'phone')}
            />
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
