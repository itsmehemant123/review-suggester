import { FETCH_SUGGESTIONS, FETCH_SUGGESTIONS_POS, CLEAR_SUGGESTIONS } from '../actions/index';

const InitialState = {
  hasData: false,
  data: []
};

export default function(state = InitialState, action) {
  switch (action.type) {
  case FETCH_SUGGESTIONS:
  // fake it here
  // return action.payload.data;
  console.log(action.payload.data);
    return {
      hasData: true,
      data: action.payload.data.data
    };
  case FETCH_SUGGESTIONS_POS:
    console.log('FROM CYPHER:', action.payload);
    return {
      hasData: true,
      data: action.payload.data.data
    };
  case CLEAR_SUGGESTIONS:
      return InitialState;
  }
  return state;
}
