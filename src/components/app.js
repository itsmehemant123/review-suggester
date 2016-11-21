import React from 'react';
import { Component } from 'react';

import SearchBar from '../containers/search_bar';
import SuggestionsList from '../containers/suggestions_list';

export default class App extends Component {
  
  render() {
    return (
      <div>
        <SearchBar />
        <SuggestionsList />
      </div>
    );
  }
}
