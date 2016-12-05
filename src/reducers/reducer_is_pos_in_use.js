import { SHOULD_USE_POS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case SHOULD_USE_POS:
    return action.payload.data;
  }
  return state;
}
