import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axois from 'axios';
import LoginButton from './LoginButton.js';
import SideMenu from './SideMenu.js';
import 'semantic-ui-css/semantic.min.css'
import logo from './logo.svg';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import LibraryPage from './LibraryPage.js';
import OAuthPage from './OAuthPage.js';
import DetailPage from './DetailPage.js';
import PlayListDetailPage from './PlayListDetailPage.js';
import APIManager from './APIManager.js';
import './Utility.css';
import './App.css';

// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class App extends Component {
  // let's handle the api key checking over here
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
    console.log('INIT');
    this.updateToken = this.updateToken.bind(this);
  }

  updateToken(token) {
    this.setState({token: token});
  }

  render() {
    return (<Router>
      <div className="ContainerDiv">
        <div className="MainViewContainerDiv">
          <div className="SideMenuDiv">
            <SideMenu/>
          </div>
          <div className="MainViewDiv">

            <div className="FillParent">
              <Route exact path="/" component={LibraryPage}/>
              <Route path="/OAuthPromise" render={(props) =>< OAuthPage {
                  ...props
                }
                updateToken = {
                  this.updateToken
                } />}/>
              <Route path="/search" component={SearchPage}/>
              <Route path="/new" component={HomePage}/>
              <Route path="/detail/album" component={DetailPage}/>
              <Route path="/detail/playlist" component={PlayListDetailPage}/>

            </div>

          </div>
        </div>
        <div className="ToolBarDiv"></div>
      </div>
    </Router>);
  }
}

export default App;
