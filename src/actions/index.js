import axios from 'axios';

const NEO4J_URL = "http://104.198.234.213:7474/db/data/cypher";

export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const CURRENT_REVIEW = 'CURRENT_REVIEW';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export const REQUEST_STATUS = 'REQUEST_STATUS';
export const SHOULD_USE_POS = 'SHOULD_USE_POS';
export const FETCH_SUGGESTIONS_POS = 'FETCH_SUGGESTIONS_POS';

function buildWordCypherQuery(word) {
  const wordList = word.split(' ');
  console.log('WORDLIST:', wordList);
  var matchQuery = "";
  var apocQuery = "";
  for(var iter = 0; iter < wordList.length; iter++) {
    matchQuery += " match (word"+(iter+1)+":WORD{word:'"+wordList[iter]+"'})";
    if(iter == 0) {
      apocQuery += " CALL apoc.index.in(word"+(iter+1)+",'HAS_WORD','position:"+(iter+1)+"') YIELD node AS sentences1";
    } else if(iter != wordList.length - 1) {
      apocQuery += " CALL apoc.index.between(sentences1,'HAS_WORD',word"+(iter+1)+",'position:"+(iter+1)+"') YIELD rel as rel"+iter+", weight as weight" + iter;
    } else {
      apocQuery += " CALL apoc.index.between(sentences1,'HAS_WORD',word"+(iter+1)+",'position:"+(iter+1)+"') YIELD rel as rel"+iter+", weight as weight" + iter;
      apocQuery += " CALL apoc.index.out(sentences1,'HAS_WORD','position:"+(iter+2)+"') yield node as words";
    }
  }
  const query = matchQuery + apocQuery + " match (sentences1)<-[:HAS_SENTENCE]-()-[:HAS_PARAGRAPH]-(review:REVIEW) with words.word as word, count(words.word) as count, avg(review.helpfulnessMetric) as metric return word,count,metric order by metric DESC, count DESC";

console.log('QUERY:', query);

  return query;
}

function buildPOSCypherQuery(word, tags) {
  return "";
}

function prepareRequestObj(query) {
  return {
    method: 'POST',
    url: 'http://130.211.181.68:7474/db/data/cypher',
    auth: {
      username: 'neo4j',
      password: 'cit581'
    },
    data: { query }
  };
}

export function fetchSuggestionsByWords(word) {
  // const request = axios({
  //   method: 'GET',
  //   url: 'https://httpbin.org/delay/3',
  // });
//console.log('BY WORDS' + word + '|');
  // if(word.slice(word.length - 2).indexOf('!') >= 0) {
  //   return {
  //     type: FETCH_SUGGESTIONS,
  //     payload: {
  //       data: [
  //
  //       ]
  //     }
  //   }
  // } else {
  //   return {
  //     type: FETCH_SUGGESTIONS,
  //     payload: {
  //       data: [
  //           {name: 'coffee', percentage: '92'}, {name: 'tea', percentage: '78'},
  //           {name: 'beer', percentage: '98'}, {name: 'water', percentage: '93'},
  //           {name: 'vodka', percentage: '89'}, {name: 'gin', percentage: '23'},
  //           {name: 'peacetea', percentage: '92'}, {name: 'sake', percentage: '38'},
  //       ]
  //     }
  //   }
  // }

  console.log('BY WORD');
  const request = axios(prepareRequestObj(buildWordCypherQuery(word)));

  return {
    type: FETCH_SUGGESTIONS,
    payload: request
  }
}

export function fetchSuggestionsByPOS(word, tag) {
  console.log('BY POS');
  const request = axios(prepareRequestObj(buildPOSCypherQuery(word, tag)));

  return {
    type: FETCH_SUGGESTIONS_POS,
    payload: request
  }
}

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

export function setIsPOSInUseStatus(status) {
  return {
    type: SHOULD_USE_POS,
    payload: {
      data: status
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
