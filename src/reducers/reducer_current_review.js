import { CURRENT_REVIEW } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case CURRENT_REVIEW:
    return [ action.payload.data ];
  }
  return state;
}
