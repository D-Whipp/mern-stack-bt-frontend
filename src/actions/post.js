import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

const url = 'https://bt-mern-behind.adaptable.app';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(url + '/api/posts');
    // const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(url + `/api/posts/like/${id}`);
    // const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove Like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(url + `/api/posts/unlike/${id}`);
    // const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(url + `/api/posts/${id}`);
    // await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(url + `/api/posts/${id}`);
    // const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      url + `/api/posts/comment/${postId}`,
      // `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove Comment
export const removeComment =
  (postId, commentId) => async (dispatch) => {
    try {
      await axios.delete(
        url + `/api/posts/comment/${postId}/${commentId}`
        // `/api/posts/comment/${postId}/${commentId}`
      );

      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
