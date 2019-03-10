import React, { Component } from 'react';
import LoginButton from './LoginButton.js';
import SearchBar from './SearchBar.js';
import 'semantic-ui-css/semantic.min.css'
import { Button, Grid } from 'semantic-ui-react';
import logo from './logo.svg';
import qs from 'qs';
import './App.css';
import './Utility.css';
import APIManager from './APIManager.js';
import SearchMenu from './SearchMenu.js';
import SearchArtist from './SearchArtist.js';
import SearchAlbum from './SearchAlbum.js';
import SearchSong from './SearchSong.js';
import ListView from './ListView.js';

import {BrowserRouter as Router, Route} from "react-router-dom";


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
  searchCallBack(val,force) {
    if(force || APIManager.throttleAPI()) {
      console.log('success!',val);
      console.log(this.props.location.pathname);
      this.props.history.push('/rkmp2Test/search/?' + encodeURIComponent(val));
      this.setState({searchText: val });
    }
  }

  detailViewCallBack(idx) {
    APIManager.setAblumIdx(idx);
    this.props.history.push('/rkmp2Test/detail/album');

  }

  render() {
    if(this.state.searchText == '') {
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
              <ListView input={ this.state.searchText } detailViewCallBack={this.detailViewCallBack}/>
          </div>
        </div>
      );
    }
  }
}

export default SearchPage;
