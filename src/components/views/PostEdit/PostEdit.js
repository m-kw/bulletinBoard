import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { updatePost, getPostById } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';

class Component extends React.Component {

  state = {
    postData: {
      id: this.props.post._id,
      title: this.props.post.title,
      content: this.props.post.content,
      author: this.props.post.author,
      location: this.props.post.location,
      created: this.props.post.created,
      phone: this.props.post.phone,
      price: this.props.post.price,
      image: this.props.post.image,
    },
  }

  static propTypes = {
    className: PropTypes.string,
    post: PropTypes.object,
    updatePost: PropTypes.func,
  };

  static getDerivedStateFromProps(props,state) {

    if (props.post !== state.postUpdated) {
      return { postUpdated: props.post };
    }

    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('submitted');

    //   const today = new Date();
    //   const day = today.getDate();
    //   const month = today.getMonth() + 1;
    //   const year = today.getFullYear();
    //   const date = day + '/' + month + '/' + year;

    //   this.setState({ postUpdated: { ...this.state.postUpdated, updated: date }});

  //   updatePost(this.props.postUpdated);
  //   //history.push('/user-posts');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log('target', target);

    this.setState({ postUpdated: { ...this.state.postUpdated, [name]: value }});
  };

  setImage = ({ target }) => {
    const files = target.files;

    if (files) this.setState({ postUpdated: { ...this.state.postUpdated, image: files[0] }});
  };

  render() {
    const { className } = this.props;
    const { handleSubmit, handleChange, setImage } = this;
    const { postUpdated } = this.state;

    console.log('postUpdated', postUpdated);

    return (
      <div className={clsx(className, styles.root)}>
        <Container maxWidth="lg">

          <Card className={styles.card}>

            <CardHeader title="Edit post" />

            <Form className={styles.form} onSubmit={e => handleSubmit(e)}>
              <FormGroup>
                <Label for="title">Title*</Label>
                <Input type="text" name="title" id="title" minLength="10" value={postUpdated.title} onChange={handleChange} required />
              </FormGroup>

              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" id="price" value={postUpdated.price} onChange={handleChange} />
              </FormGroup>

              <FormGroup>
                <Input type="file" name="image" id="image" accept="image/*" className={styles.input} value={postUpdated.image} onChange={setImage} />
              </FormGroup>
              {postUpdated.image && <img src={postUpdated.image} alt="post img" className={styles.image} />}


              <FormGroup>
                <Label for="content">Content*</Label>
                <Input type="text" name="content" id="content" minLength="20" placeholder="Write your post here" value={postUpdated.content} onChange={handleChange} required />
              </FormGroup>

              <FormGroup>
                <Label for="author">E-mail*</Label>
                <Input type="email" name="author" id="author" required value={postUpdated.author} onChange={handleChange} />
              </FormGroup>

              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" name="phone" id="phone" value={postUpdated.phone} onChange={handleChange} />
              </FormGroup>

              <FormGroup>
                <Label for="location">Location</Label>
                <Input type="text" name="location" id="location" value={postUpdated.location} onChange={handleChange} />
              </FormGroup>

              <Button type="submit" color="secondary" variant="contained" className={styles.button}>Save</Button>
              <Button color="secondary" href="/" variant="contained" className={styles.button}>Return</Button>
            </Form>
          </Card>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  updatePost: post => dispatch(updatePost(post)),
});

const PostEditContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

export {
  // Component as PostEdit,
  PostEditContainer as PostEdit,
  Component as PostEditComponent,
};
