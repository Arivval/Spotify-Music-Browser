import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Button, Image, List} from 'semantic-ui-react';
import './App.scss';
import './Utility.scss';
import APIManager from './APIManager.js';
import axios from 'axios';
import moment from 'moment';


// let's get started and refactor stuff
// we have to do nested routing in order to achieve the best effect

class DetailPage extends Component {
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
      responseJson: null,
    };
  }


  componentDidMount() {
  }

  componentWillMount() {
    this.setState({
      dataList: APIManager.getAblumList(),
      currentIdx: APIManager.getAblumIdx(),
    });
    if (APIManager.getAblumList() === null || APIManager.getAblumList().length === 0) {

    } else {
      this.requestDetailAPI(APIManager.getAblumIdx());
      if (APIManager.getAblumIdx() === 0) {
        this.setState({
          buttonLeftDisabled: true,
        });
      }
      if (APIManager.getAblumList().length === APIManager.getAblumIdx() + 1) {
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
    axios.get(APIManager.getAblumList()[inputIdx], {
      headers: {
        'Authorization': 'Bearer ' + APIManager.getToken(),
      }
    }).then(res => {
      this.setState({
        responseJSON: res,
        fetched: true,
      })
    }).catch(err => {
      }
    );
  }


  handleNavigateLeft() {
    this.setState({
      buttonLeftDisabled: this.state.currentIdx === 1,
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
      buttonRightDisabled: this.state.currentIdx + 2 === this.state.dataList.length,
    });
    this.requestDetailAPI(this.state.currentIdx + 1);
    this.setState({
      currentIdx: this.state.currentIdx + 1,
    });
  }


  render() {
    if (this.state.dataList === null || this.state.dataList.length === 0) {
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
    if (this.state.fetched === false) {
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
            src={this.state.responseJSON['data']['images'][0]['url']}
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
                  <Image src={this.state.responseJSON['data']['images'][0]['url']}/>
                </div>
              </div>
              <h2 className="DetailDescriptionView">
                {this.state.responseJSON['data']['name']}
              </h2>
              <h5 className="DetailDescriptionArtists">
                {this.state.responseJSON['data']['artists'].map((item, idx) => {
                  if (idx + 1 !== this.state.responseJSON['data']['artists'].length) {
                    return (item['name'] + ', ');
                  } else {
                    return (item['name']);
                  }
                })}
              </h5>
            </div>
            <div className="DetailListView">
              {
                (this.state.responseJSON['data']['tracks'] === null || this.state.responseJSON['data']['tracks'].length === 0) ?
                  (
                    <div>
                      Data is corrupted
                    </div>
                  ) : (
                    <List selection divided inverted size='massive'>
                      {
                        this.state.responseJSON['data']['tracks']['items'].map((item, idx) => {
                          try {
                            let momentTime = moment.duration(item['duration_ms']);
                            let timeString = '';
                            if (momentTime.hours() !== 0) {
                              timeString = momentTime.hours().toString() + ':'
                            }
                            if (momentTime.minutes() !== 0) {
                              if (momentTime.minutes() < 10 && timeString !== '') {
                                timeString = timeString + 0;
                              }
                              timeString = timeString + momentTime.minutes().toString() + ':'
                            }
                            if (timeString === '') {
                              timeString = '0:'
                            }
                            if (momentTime.seconds() < 10 && timeString !== '') {
                              timeString = timeString + 0;
                            }
                            timeString = timeString + momentTime.seconds().toString();

                            return (
                              <List.Item key={idx} name={idx}>
                                <List.Content>
                                  <List.Header>
                                    {item['name']}
                                  </List.Header>
                                </List.Content>
                                <List.Content floated='right'>{timeString}</List.Content>
                              </List.Item>
                            );
                          } catch (e) {
                            console.log(e);
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

export default DetailPage;
