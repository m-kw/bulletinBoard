import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';

const Component = ({ className, posts, updatePost, match }) => {

  const postArray = posts.filter(el => el.id === match.params.id);

  const [post, setPost] = React.useState(postArray[0]);

  // const today = new Date();
  // const day = today.getDate();
  // const month = today.getMonth();
  // const year = today.getFullYear();
  // const date = day + '/' + month + '/' + year;

  const titleProps = {
    minLength: 10,
  };

  const contentProps = {
    minLength: 20,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updatePost(post);
  };

  const handleChange = async (event, name) => {
    await setPost({
      ...post,
      [name]: event.target.value,
    });
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="lg">

        <Card className={styles.card}>

          <CardHeader title="Edit post" />

          <form className={styles.form} onSubmit={e => handleSubmit(e)}>
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
  posts: PropTypes.array,
  updatePost: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   updatePost: post => dispatch(updatePost(post)),
// });

const PostEditContainer = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  PostEditContainer as PostEdit,
  Component as PostEditComponent,
};
