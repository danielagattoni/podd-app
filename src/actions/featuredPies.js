import api from 'api';

export const REQUEST_FEATURED_PIES = 'REQUEST_FEATURED_PIES';
export const RECEIVE_FEATURED_PIES_SUCCESS = 'RECEIVE_FEATURED_PIES_SUCCESS';
export const RECEIVE_FEATURED_PIES_ERROR = 'RECEIVE_FEATURED_PIES_ERROR';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';

const MAX_PER_PAGE = 5;

export function incrementPage() {
  return {
    type: INCREMENT_PAGE
  }
}

export function decrementPage() {
  return {
    type: DECREMENT_PAGE
  }
}

function requestFeaturedPies(page) {
  return {
    type: REQUEST_FEATURED_PIES,
    page
  }
}

function receiveFeaturedPiesSuccess(featuredPies) {
  return {
    type: RECEIVE_FEATURED_PIES_SUCCESS,
    featuredPies
  }
}

function receiveFeaturedPiesError(error) {
  return {
    type: RECEIVE_FEATURED_PIES_ERROR,
    error
  }
}

function apiCallPromise(page, limit) {
  return api.get(`/stores?_embed=pies&_page=${page}&_limit=${limit}`);
}

export function fetchFeaturedPies() {
  return async (dispatch, getState) => {
    try {
      const { featuredPies: { page } } = getState();
      dispatch(requestFeaturedPies());
      const response = await apiCallPromise(page, MAX_PER_PAGE);
      dispatch(receiveFeaturedPiesSuccess(response.data));
    } catch (error) {
      dispatch(receiveFeaturedPiesError(error));
    }
  }
}
