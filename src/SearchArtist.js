import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import 'semantic-ui-css/semantic.min.css'
import { Button, Grid } from 'semantic-ui-react';
import logo from './logo.svg';
import qs from 'qs';
import './App.css';
import './Utility.css';
import APIManager from './APIManager.js';
import SearchMenu from './SearchMenu.js';
import {BrowserRouter as Router, Route} from "react-router-dom";


// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class SearchArtist extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    console.log(this.props.location.search);
  }


  render() {
    return (
      <div>
        Artist?
      </div>
    );
  }
}

export default SearchArtist;