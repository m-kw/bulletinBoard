import React from 'react';
import PropTypes from 'prop-types';

// import { NotFound } from '../NotFound/NotFound';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Post.module.scss';
import { settings } from '../../../settings.js';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    post: PropTypes.object,
    user: PropTypes.object,
    fetchPost: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  render() {
    const { className, post, user } = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <Container maxWidth="lg">

          <Card className={styles.card}>
            <div className='row'>
              <CardHeader
                title={post.title}
                subheader={post.updated ? `${post.created}/${post.updated}` : post.created}
                className={styles.title}
              />

              {post.price ? <TextField variant="outlined" label="price" className={styles.price} value={post.price} /> : ''}

              {post.image ?
                <CardMedia
                  component="img"
                  alt="post image"
                  height="140"
                  image={post.image || settings.image}
                  className={styles.image}
                />
                : ''
              }
            </div>

            <div className="row">
              <CardContent className={styles.contentWrapper}>
                <TextField multiline variant="outlined" value={post.content} className={styles.content} />

                <div className={styles.status}>
                  <i>{post.status}</i>
                </div>

                <div className={styles.contact}>
                  <h3>Contact details</h3>
                  <p>E-mail: {post.author}</p>
                  {post.phone ? <p>Phone number: {post.phone}</p> : ''}
                </div>
              </CardContent>
            </div>

            {user.logged && user.mail === post.author ?
              <CardActions className={styles.link}>
                <Button size="small" color="secondary" variant="contained" href={`/posts/${post._id}/edit`}>
                  Edit
                </Button>
              </CardActions>
              : ''
            }

          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

// const mapDispatchToProps = (dispatch) => {
//   console.log('props', props);
//   return ({
//     fetchPost: () => dispatch(fetchPostById(props.match.params.id)),
//   });
// };


const PostContainer = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};
