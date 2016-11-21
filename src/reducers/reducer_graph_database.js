import { FETCH_SUGGESTIONS, CLEAR_SUGGESTIONS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_SUGGESTIONS:
  // fake it here
  // return action.payload.data;
  return [
      {name: 'coffee', percentage: '92'}, {name: 'tea', percentage: '78', lel: action.payload.data},
      {name: 'beer', percentage: '98'}, {name: 'water', percentage: '93'},
      {name: 'vodka', percentage: '89'}, {name: 'gin', percentage: '23'},
      {name: 'peacetea', percentage: '92'}, {name: 'sake', percentage: '38'}
  ];
  case CLEAR_SUGGESTIONS:
      return [];
  }
  return state;
}
