import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginButton from './LoginButton.js';
import SideMenu from './SideMenu.js';
import 'semantic-ui-css/semantic.min.css'
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import LibraryPage from './LibraryPage.js';
import DetailPage from './DetailPage.js';
import PlayListDetailPage from './PlayListDetailPage.js';
import './Utility.scss';
import './App.scss';
import {Dimmer} from "semantic-ui-react";

// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class App extends Component {
  // let's handle the api key checking over here
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
    this.updateToken = this.updateToken.bind(this);
  }

  updateToken(token) {
    this.setState({token: token});
  }

  render() {
    if (this.state.token === '') {
      return (
        <Router>
          <div className="ContainerDiv">
            <Dimmer active>
              <div className="U_Center U_LargeText">
                <LoginButton/>
              </div>
            </Dimmer>
            <div className="MainViewContainerDiv">
              <div className="SideMenuDiv">
                <SideMenu/>
              </div>
              <div className="MainViewDiv">

                <div className="FillParent">
                  {/*<Route exact path="/Spotify-Music-Browser" component={LibraryPage}/>*/}
                  <Route exact path="/Spotify-Music-Browser" render={(props) =>
                    < LibraryPage {
                                    ...props
                                  }
                                  updateToken={
                                    this.updateToken
                                  }/>}/>
                  <Route path="/Spotify-Music-Browser/search" component={SearchPage}/>
                  <Route path="/Spotify-Music-Browser/new" component={HomePage}/>
                  <Route path="/Spotify-Music-Browser/detail/album" component={DetailPage}/>
                  <Route path="/Spotify-Music-Browser/detail/playlist" component={PlayListDetailPage}/>

                </div>

              </div>
            </div>
            <div className="ToolBarDiv"></div>
          </div>
        </Router>);
    }
    return (<Router>
      <div className="ContainerDiv">
        <div className="MainViewContainerDiv">
          <div className="SideMenuDiv">
            <SideMenu/>
          </div>
          <div className="MainViewDiv">

            <div className="FillParent">
              {/*<Route exact path="/Spotify-Music-Browser" component={LibraryPage}/>*/}
              <Route exact path="/Spotify-Music-Browser" render={(props) =>
                < LibraryPage {
                                ...props
                              }
                              updateToken={
                                this.updateToken
                              }/>}/>
              <Route path="/Spotify-Music-Browser/search" component={SearchPage}/>
              <Route path="/Spotify-Music-Browser/new" component={HomePage}/>
              <Route path="/Spotify-Music-Browser/detail/album" component={DetailPage}/>
              <Route path="/Spotify-Music-Browser/detail/playlist" component={PlayListDetailPage}/>

            </div>

          </div>
        </div>
        <div className="ToolBarDiv"></div>
      </div>
    </Router>);
  }
}

export default App;
