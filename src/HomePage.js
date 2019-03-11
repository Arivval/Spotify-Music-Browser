import React, {Component} from 'react';
import SearchBar from './SearchBar.js';
import 'semantic-ui-css/semantic.min.css'
import {Image, Dropdown} from 'semantic-ui-react';
import './App.scss';
import './Utility.scss';
import APIManager from './APIManager.js';
import axios from 'axios';
import {List} from "semantic-ui-react";
import PropTypes from 'prop-types';


// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchCallBack = this.searchCallBack.bind(this);
    this.detailViewCallBack = this.detailViewCallBack.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleAsc = this.handleAsc.bind(this);
    this.handleRank = this.handleRank.bind(this);

    this.state = {
      searchText: '',
      requested: false,
      JSON: null,
      doneRequesting: false,
      rankVal: 1,
      ascVal: 1,
    };
  }


  componentDidMount() {
  }

  componentWillMount() {

  }

  handleAsc(e, {value}) {
    this.setState({
      ascVal: value,
    });
  }

  handleRank(e, {value}) {
    this.setState({
      rankVal: value,
    });
  }

  onClickHandler(idx) {
    APIManager.setAblumList(
      this.state.JSON.filter(input => {
        return (
          input['name'].toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          input['artists'].reduce((acc, artist) => {
            return (acc || artist['name'].toUpperCase().includes(this.state.searchText.toUpperCase()));
          }, false)
        );
      }).sort((a, b) => {
        if (this.state.rankVal == 1) {
          if (this.state.ascVal == 1) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (this.state.ascVal == 1) {
            return ((a['name'].toUpperCase() > b['name'].toUpperCase() > 0) ? 1 : -1);
          } else {
            return ((a['name'].toUpperCase() > b['name'].toUpperCase() > 0) ? -1 : 1);
          }
        }
      }).reduce((acc, input) => {
        return (acc.concat(input['href']));
      }, []));
    APIManager.setAblumIdx(idx);
    this.props.history.push('/rkmp2Test/detail/album');

  }

  // if force is false, we need to throttle the API call
  searchCallBack(val, force) {
    if (!this.state.requested) {
      this.setState({
        requested: true,
      });
    }
    this.setState({
      searchText: val,
    });

    if (this.state.doneRequesting) {
      return;
    }

    axios.get('https://api.spotify.com/v1/browse/new-releases', {
      params: {
        'limit': 50,
      },
      headers: {
        'Authorization': 'Bearer ' + APIManager.getToken(),
      }
    }).then(res => {
      this.setState({
        JSON: res['data']['albums']['items'],
      });

      axios.get(res['data']['albums']['next'], {
        params: {
          'limit': 50,
        },
        headers: {
          'Authorization': 'Bearer ' + APIManager.getToken(),
        }
      }).then(res1 => {
        this.setState({
          JSON: this.state.JSON.concat(res1['data']['albums']['items']),
          doneRequesting: true,
        })
      }).catch(err => {
          console.log('BAD!', err);
          this.setState({
            requested: false,
          });
        }
      );


    }).catch(err => {
        console.log('BAD!', err);
        this.setState({
          requested: false,
        });
      }
    );
  }

  detailViewCallBack(idx) {
    APIManager.setAblumIdx(idx);
    this.props.history.push('/rkmp2Test/detail/album');

  }

  render() {
    if (this.state.doneRequesting == false) {
      return (
        <div className="LandingPage">
          <div className="StickyNavBar">
            <SearchBar searchCallBack={this.searchCallBack} placeholder={'Filter'}/>
          </div>
          <div className="SearchResultPage">
            <div className="U_Center U_LargeText">
              Filter the Trending New Releases
            </div>
          </div>
        </div>
      );
    } else {
      let retList = this.state.JSON.filter(input => {
        return (
          input['name'].toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          input['artists'].reduce((acc, artist) => {
            return (acc || artist['name'].toUpperCase().includes(this.state.searchText.toUpperCase()));
          }, false)
        );
      }).sort((a, b) => {
        if (this.state.rankVal == 1) {
          if (this.state.ascVal == 1) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (this.state.ascVal == 1) {
            return ((a['name'].toUpperCase() > b['name'].toUpperCase() > 0) ? 1 : -1);
          } else {
            return ((a['name'].toUpperCase() > b['name'].toUpperCase() > 0) ? -1 : 1);
          }
        }
      }).map((item, idx) => {
        try {
          let displayName = item['name'];
          let overlength = displayName.length > 100;
          while (displayName.length > 100) {
            displayName = displayName.slice(0, -1);
          }
          if (overlength) {
            displayName += '...';
          }
          // ablumAPIList.push(item['href']);
          return (<List.Item key={idx} name={idx} onClick={() => {
            this.onClickHandler(idx)
          }}>
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
          console.log(idx, e);
          return (null);
        }
      });

      if (this.state.JSON.filter(input => {
        return (
          input['name'].toUpperCase().includes(this.state.searchText.toUpperCase()) ||
          input['artists'].reduce((acc, artist) => {
            return (acc || artist['name'].toUpperCase().includes(this.state.searchText.toUpperCase()));
          }, false)
        );
      }).length == 0) {
        retList =
          <List.Item>
            <List.Content>
              <List.Header>
                No Results Found
              </List.Header>
            </List.Content>
          </List.Item>
      }

      return (
        <div className="LandingPage">
          <div className="StickyNavBar">
            <SearchBar searchCallBack={this.searchCallBack}/>
          </div>
          <div className="SearchResultPage">
            <div className="FilterContainer">
              Sort By: &nbsp;&nbsp;&nbsp;
              <Dropdown options={[{key: 1, text: 'Rank', value: 1}, {key: 2, text: 'Alphabet', value: 2}]} selection
                        value={this.state.rankVal} onChange={this.handleRank}/>
              &nbsp;&nbsp;&nbsp;
              <Dropdown options={[{key: 1, text: 'Ascending', value: 1}, {key: 2, text: 'Descending', value: 2}]}
                        selection value={this.state.ascVal} onChange={this.handleAsc}/>
            </div>
            <List selection divided inverted size='massive'>
              {retList}
            </List>
          </div>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
}

export default HomePage;
