import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postCurrentReview, clearSuggestions, setRequestStatus, setIsPOSInUseStatus } from '../actions/index';

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

  shouldUpdate(nextProps, nextState) {
    if(!this.props.requestSent) {
      return false;
    }
  }

  renderSuggestions(sList) {

    // render nicely, clickable by id/option
    // var listItems = sList.data.map(obj => {
    //   return(
    //     <li>I think <span className="tag tag-primary">{obj[0].data.name}</span></li>
    //   );
    // });
    // console.log("SLIST:", sList);

    // Display the probility or predicted helpfulness too in the suggestion
    var listItems = sList.data.map(obj => {
      var text = this.props.currentReview + " " + obj[0];
      console.log('DA:', obj);
      const percentageInt = (parseFloat(obj[2]).toFixed(4) * 100).toFixed(2);
      var colorOfTag = this.returnColorClassForPercentage(percentageInt);
      return (
        <li className="list-group-item suggestion_item" onClick={() => this.onClickSuggestion(text)}><h3 >{this.props.currentReview} <span className="tag tag-success">{obj[0]}</span> <span className={colorOfTag}>{percentageInt}%</span></h3></li>
      );
    });

    if(this.props.currentReview != "" && listItems == "" && this.props.requestSent && !this.props.posInUse) {
      listItems = (
        <img src="/res/images/ellipsis.gif" height="35px" style={{marginLeft: '20px'}} />
      );
    } else if(this.props.currentReview != "" && listItems == "" && this.props.requestSent && this.props.posInUse) {
      listItems = (
        <div> Using POS
            <img src="/res/images/ellipsis.gif" height="35px" style={{marginLeft: '20px'}} />
        </div>
      );
    } else {
      this.props.setRequestStatus(false);
      this.props.setIsPOSInUseStatus(false);
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

function mapStateToProps({ suggestions, currentReview, requestSent, posInUse }) {
  return { suggestions: suggestions, currentReview: currentReview, requestSent: requestSent, posInUse: posInUse };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postCurrentReview, clearSuggestions, setRequestStatus, setIsPOSInUseStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsList);
