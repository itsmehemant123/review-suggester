import axios from 'axios';

const NEO4J_URL = "http://104.198.234.213:7474/db/data/cypher";

export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const CURRENT_REVIEW = 'CURRENT_REVIEW';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export const REQUEST_STATUS = 'REQUEST_STATUS';

export function fetchSuggestions(word) {

  // const request = axios({
  //   method: 'post',
  //   url: NEO4J_URL,
  //   auth: {
  //     username: 'neo4j',
  //     password: 'cit581'
  //   },
  //   data: {
  //     "query" : "MATCH (n:CATEGORY) RETURN n LIMIT 25",
  //     "params" : null
  //   }
  // });

  // return {
  //   type: FETCH_SUGGESTIONS,
  //   payload: request
  // };

  const request = axios({
    method: 'GET',
    url: 'https://httpbin.org/delay/3',
  });

  return {
    type: FETCH_SUGGESTIONS,
    payload: request
  }
}

export function postCurrentReview(review) {
  return {
    type: CURRENT_REVIEW,
    payload: {
      data: review
    }
  }
}

export function setRequestStatus(didSend) {
  return {
    type: REQUEST_STATUS,
    payload: {
      data: didSend
    }
  }
}

export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS
  }
}

// Delete after use

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
