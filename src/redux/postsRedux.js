import Axios from 'axios';
import { API_URL } from '../settings.js';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPublished = ({ posts }) => posts.data.filter(el => el.status === 'published');
export const getPostById = ({ posts }, postId) => {
  const postsArray = posts.data.filter(el => el._id === postId);
  return postsArray.length ? postsArray[0] : { error: true };
};
// export const getRequest = ({ posts }, name) => posts.requests[name];

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// const START_REQUEST = createActionName('START_REQUEST');
// const END_REQUEST = createActionName('END_REQUEST');
// const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

// export const startRequest = payload => ({ payload, type: START_REQUEST });
// export const endRequest = payload => ({ payload, type: END_REQUEST });
// export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const addPost = payload => ({ payload, type: ADD_POST });
export const updatePost = payload => ({ payload, type: UPDATE_POST });

/* thunk creators */
export const fetchPublished = () => {

  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostRequest = (data) => {

  console.log('addPost request');

  return async dispatch => {

    dispatch(fetchStarted());

    try {
      let res = await Axios.post(
        `${API_URL}/posts`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      dispatch(addPost(res.data));
      dispatch(fetchSuccess());
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  // console.log('statePart', statePart);
  // console.log('action', action);
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: statePart.data.map(el => {
          return el.id === action.payload.id ?
            action.payload
            : el;
        }),
      };
    }
    default:
      return statePart;
  }
};
