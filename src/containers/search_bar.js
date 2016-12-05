import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import pos from 'pos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSuggestions, fetchSuggestionsByWords, fetchSuggestionsByPOS, postCurrentReview, setRequestStatus, clearSuggestions, setIsPOSInUseStatus } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onKeyPress(event) {
    if(event.charCode == 32) {
      this.props.clearSuggestions();
      this.props.setRequestStatus(true);
      this.props.postCurrentReview(this.state.term);
      this.props.fetchSuggestionsByWords(this.state.term);
    }
  }

  componentWillReceiveProps(nextProps) {
    // This is for setting the search bar with the updated query once the user clicks on one of the suggestions.
    if (nextProps.currentReview && nextProps.currentReview !== this.state.term) {
      const newTerm = (nextProps.currentReview[nextProps.currentReview.length - 1] == ' ')? nextProps.currentReview : nextProps.currentReview + ' ';
      if(this.state.term.length != 0) {
        this.setState({term: newTerm});
      } else {
        this.setState({ term: nextProps.currentReview });
      }
      ReactDOM.findDOMNode(this.refs.reviewText).focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('HIT PROPS:', prevProps);
    //console.log('HIT STATE:', prevState);
    if(prevProps.suggestions.hasData && prevProps.suggestions.data.length == 0 && !prevProps.posInUse) {
      //console.log('HIT THE POS');
      this.props.setRequestStatus(true);
      this.props.setIsPOSInUseStatus(true);
      this.props.fetchSuggestionsByPOS(this.state.term, []);
    }
  }

  render() {
    return (
      <form className="input-group">
      <input
        id="reviewText"
        ref="reviewText"
        placeholder="Type review"
        className="form-control"
        value={this.state.term}
        onChange={this.onInputChange} onKeyPress={this.onKeyPress}
        hack={this.props.currentReview}
        />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSuggestions, fetchSuggestionsByWords, fetchSuggestionsByPOS, postCurrentReview, setRequestStatus, clearSuggestions, setIsPOSInUseStatus }, dispatch);
}

function mapStateToProps({ currentReview, suggestions, requestSent, posInUse }) {
  return { currentReview: currentReview, suggestions: suggestions, requestSent: requestSent, posInUse: posInUse };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
