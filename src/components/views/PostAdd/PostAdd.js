import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className, addPost, history }) => {

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = day + '/' + month + '/' + year;

  const [post, setPost] = React.useState({
    author: '',
    title: '',
    content: '',
    created: date,
    phone: '',
    price: '',
    location: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addPost(post);
    // history.push('/user-posts');

  };

  const handleChange = async (event, name) => {
    await setPost({
      ...post,
      [name]: event.target.value,
    });
  };

  const setImage = ({ target }) => {
    const { files } = target;

    if (files) setPost({ ...post, image: files[0] });
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="lg">

        <Card className={styles.card}>

          <CardHeader title="Add new post" />

          <Form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <FormGroup>
              <Label for="title">Title*</Label>
              <Input type="text" name="title" id="title" minLength="10" onChange={e => handleChange(e, 'title')} required />
            </FormGroup>

            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="number" name="price" id="price" onChange={e => handleChange(e, 'price')} />
            </FormGroup>

            <FormGroup>
              <Input type="file" name="image" id="image" accept="image/*" className={styles.input} onChange={setImage} />
            </FormGroup>

            <FormGroup>
              <Label for="content">Content*</Label>
              <Input type="text" name="content" id="content" minLength="20" placeholder="Write your post here" onChange={e => handleChange(e, 'content')} required />
            </FormGroup>

            <FormGroup>
              <Label for="author">E-mail*</Label>
              <Input type="email" name="author" id="author" required onChange={e => handleChange(e, 'author')} />
            </FormGroup>

            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input type="text" name="phone" id="phone" onChange={e => handleChange(e, 'phone')} />
            </FormGroup>

            <FormGroup>
              <Label for="location">Location</Label>
              <Input type="text" name="location" id="location" onChange={e => handleChange(e, 'location')} />
            </FormGroup>

            <Button type="submit" className={styles.button}>Save</Button>
            <Button href="/" className={styles.button}>Return</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  addPost: PropTypes.func,
  history: PropTypes.object,
};

// const mapStateToProps = state => ({
//   posts: getAll(state),
// });

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPostRequest(data)),
});

const PostAddContainer = connect(null, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  PostAddContainer as PostAdd,
  Component as PostAddComponent,
};
