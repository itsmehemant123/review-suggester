import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSuggestions, postCurrentReview, setRequestStatus, clearSuggestions } from '../actions/index';

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
      this.props.fetchSuggestions(this.state.term);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentReview && nextProps.currentReview !== this.state.term) {
      this.setState({ term: nextProps.currentReview });
      ReactDOM.findDOMNode(this.refs.reviewText).focus();
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
  return bindActionCreators({ fetchSuggestions, postCurrentReview, setRequestStatus, clearSuggestions }, dispatch);
}

function mapStateToProps({ currentReview }) {
  return { currentReview: currentReview };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
