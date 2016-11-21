import { combineReducers } from 'redux';
import SuggestionsReducer from './reducer_graph_database';
import CurrentReview from './reducer_current_review';
import RequestStatus from './reducer_request_status';

const rootReducer = combineReducers({
  suggestions: SuggestionsReducer,
  currentReview: CurrentReview,
  requestSent: RequestStatus
});

export default rootReducer;
