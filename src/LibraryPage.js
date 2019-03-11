import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Dimmer, Loader, Menu, Image} from 'semantic-ui-react';
import qs from 'qs';
import './App.css';
import axios from 'axios';
import './Utility.css';
import APIManager from './APIManager.js';

// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class LibraryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseCategory: [],
      activeMenu: '',
      responsePlayLists: [],
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.requestPlayLists = this.requestPlayLists.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if(qs.parse(this.props.location.hash)['#access_token']===undefined) {

    } else {
      this.props.updateToken(qs.parse(this.props.location.hash)['#access_token']);
      APIManager.setToken(qs.parse(this.props.location.hash)['#access_token']);
    }

    axios.get('https://api.spotify.com/v1/browse/categories', {
      headers: {
        'Authorization': 'Bearer ' + APIManager.getToken(),
      }
    }).then(res => {
      try {
        this.setState({
          responseCategory: res['data']['categories']['items'],
          activeMenu: res['data']['categories']['items'][0]['name'],
        })
        this.requestPlayLists(res['data']['categories']['items'][0]['href']);
      } catch {

      }
    }).catch(err => {
      }
    );
  }


  handleMenuClick(e, {name}) {
    let APIUrl = '';
    for (let i = 0; i < 8; i++) {
      if (name == this.state.responseCategory[i]['name']) {
        APIUrl = this.state.responseCategory[i]['href'];
        break
      }
    }
    this.requestPlayLists(APIUrl);
    this.setState({
      activeMenu: name,
    });
  }

  handleClick(index) {
    APIManager.setPlayList(this.state.responsePlayLists);
    APIManager.setPlayListIndex(index);
    this.props.history.push('/rkmp2Test/detail/playlist');

  }

  requestPlayLists(APILink) {
    if (APILink === null) {
      return;
    }
    axios.get(APILink + '/playlists', {
      params: {
        'limit': 50,
      },
      headers: {
        'Authorization': 'Bearer ' + APIManager.getToken(),
      }
    }).then(res => {
      this.setState({
        responsePlayLists: res['data']['playlists']['items']
      });
    }).catch(err => {
      }
    );

  }



  render() {
     if (APIManager.getToken() == '') {
      return (
        null
      );
    } else if (this.state.responseCategory === null || this.state.responseCategory.length == 0) {
      return (
        <div className="LandingPage">
          <Dimmer active>
            <Loader/>
          </Dimmer>
        </div>
      );
    } else {
      let retMenu = this.state.responseCategory.map((item, idx) => {
        if (idx < 8) {
          return (
            <Menu.Item
              name={item['name']}
              key={idx}
              onClick={this.handleMenuClick}
              active={this.state.activeMenu == item['name']}
            />
          );
        }
        return (null);
      });
      let retGrids = this.state.responsePlayLists.map((item, idx) => {
        return (
          <div className="GridDisplayBlock" key={idx}>
            <div className="GridDisplayImageContainer">
              <div className="GridDisplayImageView" onClick={()=>{this.handleClick(idx)}}>
                <Image src={item['images'][0]['url']}/>
              </div>
            </div>
            <div className="GridDisplayTitle">
              {item['name']}
            </div>
          </div>
        );
      });

      return (
        <div className="LandingPage">
          {this.state.responsePlayLists.length != 0 ? (
            <div className="LibraryBackground">
              <Image src={this.state.responsePlayLists[0]['images'][0]['url']} className="FillParent"/>
            </div>
          ) : (null)}
          <div className="LibraryContainer">
            <div className="LibraryNavigator">
              <Menu widths={8} pointing inverted secondary size="massive">
                {retMenu}
              </Menu>
            </div>
            <div className="LibraryViewContainer">
              <div className="LibraryView">
                <div className="LibraryViewCenter U_Center">
                  {retGrids}
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
  }
}

export default LibraryPage;
