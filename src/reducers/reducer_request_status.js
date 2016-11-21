import { REQUEST_STATUS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case REQUEST_STATUS:
    return action.payload.data;
  }
  return state;
}
