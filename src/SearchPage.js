import React, {Component} from 'react';
import SearchBar from './SearchBar.js';
import './App.scss';
import './Utility.scss';
import APIManager from './APIManager.js';
import ListView from './ListView.js';
import PropTypes from 'prop-types';


// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.searchCallBack = this.searchCallBack.bind(this);
    this.detailViewCallBack = this.detailViewCallBack.bind(this);

    this.state = {
      searchText: '',
    };
  }


  componentDidMount() {
  }

  // if force is false, we need to throttle the API call
  searchCallBack(val, force) {
    if (force || APIManager.throttleAPI()) {
      this.props.history.push('/Spotify-Music-Browser/search/?' + encodeURIComponent(val));
      this.setState({searchText: val});
    }
  }

  detailViewCallBack(idx) {
    APIManager.setAblumIdx(idx);
    this.props.history.push('/Spotify-Music-Browser/detail/album');

  }

  render() {
    if (this.state.searchText == '') {
      return (
        <div className="LandingPage">
          <div className="StickyNavBar">
            <SearchBar searchCallBack={this.searchCallBack} placeholder={'Search For Albums'}/>
          </div>
          <div className="SearchResultPage">
            <div className="U_Center U_LargeText">
              Search for Albums on Spotify
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="LandingPage">
          <div className="StickyNavBar">
            <SearchBar searchCallBack={this.searchCallBack}/>
          </div>
          <div className="SearchResultPage">
            <ListView input={this.state.searchText} detailViewCallBack={this.detailViewCallBack}/>
          </div>
        </div>
      );
    }
  }
}

SearchPage.propTypes = {
  history: PropTypes.object,
}

export default SearchPage;
