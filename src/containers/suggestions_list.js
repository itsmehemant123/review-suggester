import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postCurrentReview, clearSuggestions, setRequestStatus } from '../actions/index';

class SuggestionsList extends Component {
  constructor(props) {
    super(props);

    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.onClickSuggestion = this.onClickSuggestion.bind(this);
  }

  onClickSuggestion(element) {
    this.props.postCurrentReview(element);
    this.props.clearSuggestions();
  }

  renderSuggestions(sList) {

    // render nicely, clickable by id/option
    // var listItems = sList.data.map(obj => {
    //   return(
    //     <li>I think <span className="tag tag-primary">{obj[0].data.name}</span></li>
    //   );
    // });
    // console.log(sList);

    // Display the probility or predicted helpfulness too in the suggestion
    var listItems = sList.map(obj => {
      var text = this.props.currentReview + " " + obj.name;
      var colorOfTag = this.returnColorClassForPercentage(obj.percentage);
      return (
        <li className="list-group-item suggestion_item" onClick={() => this.onClickSuggestion(text)}><h3 >{this.props.currentReview} <span className="tag tag-success">{obj.name}</span> <span className={colorOfTag}>{obj.percentage}%</span></h3></li>
      );
    });

    if(this.props.currentReview != "" && listItems == "" && this.props.requestSent) {
      listItems = (
        <img src="/res/images/ellipsis.gif" height="35px" style={{marginLeft: '20px'}} />
      );
    } else {
      this.props.setRequestStatus(false);
    }

    return (
      <div>{listItems}</div>
    );
  }

  render() {
    return (
      <div className="card">
        <ul className="list-group list-group-flush">
          {this.renderSuggestions(this.props.suggestions)}
        </ul>
      </div>
    );
  }

  returnColorClassForPercentage(percentage) {
    var intPercentage = parseInt(percentage);

    if(intPercentage > 85) {
      return 'tag tag-pill tag-success suggestion_item_percentage';
    } else if(intPercentage <= 85 && intPercentage > 75) {
      return 'tag tag-pill tag-warning suggestion_item_percentage';
    } else {
      return 'tag tag-pill tag-danger suggestion_item_percentage'
    }
  }
}

function mapStateToProps({ suggestions, currentReview, requestSent }) {
  return { suggestions: suggestions, currentReview: currentReview, requestSent: requestSent };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postCurrentReview, clearSuggestions, setRequestStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsList);
