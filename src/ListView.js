import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { List, Image } from 'semantic-ui-react';
import './App.css';
import './Utility.css';
import APIManager from './APIManager.js';
import axios from 'axios';

// now we got to request the API in our list view


class SearchArtist extends Component {
  constructor(props) {
    super(props);
    this.searchAPI = this.searchAPI.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.state = {
      responseJSON: null,
    };
  }


  componentDidMount() {
    this.searchAPI(this.props.input);
  }


  componentWillReceiveProps(nextProps, nextContext) {
    this.searchAPI(nextProps.input);

  }

  onClickHandler(e, {name}) {
    this.props.detailViewCallBack(name);

  }

  searchAPI(inputStr) {
    // doing GET request
    axios.get('https://api.spotify.com/v1/search', {
      params: {
        'q': inputStr,
        'type': 'album',
        'limit': 50,
      },
      headers: {
        'Authorization': 'Bearer ' + APIManager.getToken(),
      }
    }).then(res => {
      this.setState({responseJSON: res})
    }).catch(err => {
      }
    );
  }


  render() {
    if (this.state.responseJSON === null) {
      return (null);
    } else {

      let retList = null;

      if (this.state.responseJSON['data']['albums']['items'].length == 0) {
        retList = <List.Item>
          <List.Content>
            <List.Header>
              No Results Found
            </List.Header>
          </List.Content>
        </List.Item>
      } else {
        let ablumAPIList = [];
        retList = this.state.responseJSON['data']['albums']['items'].map((item, idx) => {
          try {
            let displayName = item['name'];
            let overlength = displayName.length > 100;
            while (displayName.length > 100) {
              displayName = displayName.slice(0, -1);
            }
            if (overlength) {
              displayName += '...';
            }
            ablumAPIList.push(item['href']);
            return (<List.Item key={idx} name={idx} onClick={this.onClickHandler}>
              <Image src={item['images'][2]['url']}/>
              <List.Content>
                <List.Header>
                  {displayName}
                </List.Header>
                <List.Description>
                  {item['artists'].map((innerItem, idx) => {
                    while (idx < 3) {
                      if (idx + 1 != item['artists'].length && idx != 2) {
                        return (innerItem['name'] + ', ');
                      } else {
                        return (innerItem['name']);
                      }
                    }
                    if (idx == 3) {
                      return ('...');
                    }
                  })
                  }
                </List.Description>
              </List.Content>
            </List.Item>);
          } catch (e) {
            // Spotify API sometimes have bug of returning null :/, have to catch it for them
            return (null);
          }
        });
        APIManager.setAblumList(ablumAPIList);
      }

      return (
        <List selection divided inverted size='massive'>
          {retList}
        </List>
      );
    }
  }
}


export default SearchArtist;
