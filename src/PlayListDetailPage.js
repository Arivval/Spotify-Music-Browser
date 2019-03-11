import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Button, Grid, Segment, Image, List} from 'semantic-ui-react';
import './App.css';
import './Utility.css';
import APIManager from './APIManager.js';
import axios from 'axios';
import moment from 'moment';


// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class PlayListDetailPage extends Component {
  constructor(props) {
    super(props);
    this.handleNavigateLeft = this.handleNavigateLeft.bind(this);
    this.handleNavigateRight = this.handleNavigateRight.bind(this);
    this.requestDetailAPI = this.requestDetailAPI.bind(this);
    this.state = {
      buttonLeftDisabled: false,
      buttonRightDisabled: false,
      dataList: [],
      currentIdx: 0,
      fetched: false,
      infoJSON: null,
      trackJSON: null,
    };
  }


  componentDidMount() {
  }

  componentWillMount() {
    console.log(APIManager.getPlayListIndex());
    console.log('componentWillMount!');
    this.setState({
      dataList: APIManager.getPlayList(),
      currentIdx: APIManager.getPlayListIndex(),
    });
    if (APIManager.getPlayList() === null || APIManager.getPlayList().length == 0) {

    } else {
      this.requestDetailAPI(APIManager.getPlayListIndex());
      if (APIManager.getPlayListIndex() == 0) {
        this.setState({
          buttonLeftDisabled: true,
        });
      }
      if (APIManager.getPlayList().length == APIManager.getPlayListIndex() + 1) {
        this.setState({
          buttonRightDisabled: true,
        });
      }
    }
  }


  requestDetailAPI(inputIdx) {
    this.setState({
      fetched: false,
    });
    console.log('we need to request ', inputIdx, ' ', APIManager.getPlayList()[inputIdx]);
    axios.get(APIManager.getPlayList()[inputIdx]['tracks']['href'], {
      headers: {
        'Authorization': 'Bearer ' + APIManager.getToken(),
      }
    }).then(res => {
      console.log('GOOD we got res!', res);
      this.setState({
        infoJSON: APIManager.getPlayList()[inputIdx],
        trackJSON: res,
        fetched: true,
      })
    }).catch(err => {
        console.log('BAD!', err);
      }
    );
  }


  handleNavigateLeft() {
    this.setState({
      buttonLeftDisabled: this.state.currentIdx == 1,
      buttonRightDisabled: false,
    });
    this.requestDetailAPI(this.state.currentIdx - 1);
    this.setState({
      currentIdx: this.state.currentIdx - 1,
    });
  }

  handleNavigateRight() {
    this.setState({
      buttonLeftDisabled: false,
      buttonRightDisabled: this.state.currentIdx + 2 == this.state.dataList.length,
    });
    this.requestDetailAPI(this.state.currentIdx + 1);
    this.setState({
      currentIdx: this.state.currentIdx + 1,
    });
  }


  render() {
    if (this.state.dataList === null || this.state.dataList.length == 0) {
      return (
        <div className="DetailContainer">
          <div className="DetailNavigator">
            <div className="LeftNavigatorButtonContainer">
              <Button icon="left chevron" color="black" onClick={this.handleNavigateLeft} disabled/>
            </div>
            <div className="RightNavigatorButtonContainer">
              <Button icon="right chevron" color="black" onClick={this.handleNavigateRight} disabled/>
            </div>
          </div>
          <div className="DetailView">
            <div className="U_Center">
              <div className="U_LargeText">
                No Data Found
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.fetched == false) {
      return (
        <div className="DetailContainer">
          <div className="DetailNavigator">
            <div className="LeftNavigatorButtonContainer">
              <Button icon="left chevron" color="black" onClick={this.handleNavigateLeft}
                      disabled={this.state.buttonLeftDisabled}/>
            </div>
            <div className="RightNavigatorButtonContainer">
              <Button icon="right chevron" color="black" onClick={this.handleNavigateRight}
                      disabled={this.state.buttonRightDisabled}/>
            </div>
          </div>
          <div className="DetailView">
            <div className="DetailFlexContainer U_Center">
              <div className="DetailPictureView">
                <div className="DetailImageContainer">
                  <div className="DetailImageView">
                  </div>
                </div>
              </div>
              <div className="DetailListView">
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="DetailContainer">
        <div className="DetailBackground">
          <Image
            src={this.state.infoJSON['images'][0]['url']}
            className="FillParent"
          />
        </div>
        <div className="DetailNavigator">
          <div className="LeftNavigatorButtonContainer">
            <Button icon="left chevron" color="black" onClick={this.handleNavigateLeft}
                    disabled={this.state.buttonLeftDisabled}/>
          </div>
          <div className="RightNavigatorButtonContainer">
            <Button icon="right chevron" color="black" onClick={this.handleNavigateRight}
                    disabled={this.state.buttonRightDisabled}/>
          </div>
        </div>
        <div className="DetailView">
          <div className="DetailFlexContainer U_Center">
            <div className="DetailPictureView">
              <div className="DetailImageContainer">
                <div className="DetailImageView">
                  <Image src={this.state.infoJSON['images'][0]['url']} className="FillParent"/>
                </div>
              </div>
              <h2 className="DetailDescriptionView">
                {this.state.infoJSON['name']}
              </h2>
              <h5 className="DetailDescriptionArtists">
                { (!this.state.infoJSON['collaborative'])?
                    ('Presented by ' + this.state.infoJSON['owner']['display_name']):
                    ('Collaborative Playlist')
                }
              </h5>
            </div>
            <div className="DetailListView">
              {
                (this.state.trackJSON['data']['items'] === null || this.state.trackJSON['data']['items'].length == 0) ?
                  (
                    <div>
                      Data is corrupted
                    </div>
                  ) : (
                    <List selection divided inverted size='massive'>
                      {
                        this.state.trackJSON['data']['items'].map((item, idx) => {
                          try {
                            let momentTime = moment.duration(item['track']['duration_ms']);
                            let timeString = '';
                            if (momentTime.hours() != 0) {
                              timeString = momentTime.hours().toString() + ':'
                            }
                            if (momentTime.minutes() != 0) {
                              if (momentTime.minutes() < 10 && timeString != '') {
                                timeString = timeString + 0;
                              }
                              timeString = timeString + momentTime.minutes().toString() + ':'
                            }
                            if (timeString == '') {
                              timeString = '0:'
                            }
                            if (momentTime.seconds() < 10 && timeString != '') {
                              timeString = timeString + 0;
                            }
                            timeString = timeString + momentTime.seconds().toString();

                            return (
                              <List.Item key={idx} name={idx}>
                                <List.Content>
                                  <List.Header>
                                    {item['track']['name']}
                                  </List.Header>
                                  <div className="TruncateDiv">
                                    {item['track']['artists'].map((artistItem, idx) => {
                                      if (idx + 1 != item['track']['artists'].length) {
                                        return (artistItem['name'] + ', ');
                                      } else {
                                        return (artistItem['name']);
                                      }
                                    })}
                                  </div>
                                </List.Content>
                                <List.Content floated='right'>{timeString}</List.Content>
                              </List.Item>
                            );
                          } catch (e) {
                            console.log(e)
                            return (null);
                          }
                        })
                      }
                    </List>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayListDetailPage;
