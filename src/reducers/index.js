import { combineReducers } from 'redux';
import SuggestionsReducer from './reducer_graph_database';
import CurrentReview from './reducer_current_review';
import RequestStatus from './reducer_request_status';
import POSStatus from './reducer_is_pos_in_use';

const rootReducer = combineReducers({
  suggestions: SuggestionsReducer,
  currentReview: CurrentReview,
  requestSent: RequestStatus,
  posInUse: POSStatus
});

export default rootReducer;
