import React, { Component } from 'react';
import LoginButton from './LoginButton.js';
import 'semantic-ui-css/semantic.min.css'
import logo from './logo.svg';
import './App.css';
import qs from 'qs';
import APIManager from './APIManager.js';


class OAuthPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      OAuthResponse: null,
    }
  }

  componentDidMount() {
    this.setState({OAuthResponse: qs.parse(this.props.location.hash)});
    console.log(this.props.location.hash);
    console.log(qs.parse(this.props.location.hash));
    this.props.updateToken(qs.parse(this.props.location.hash)['#access_token']);
    APIManager.setToken(qs.parse(this.props.location.hash)['#access_token']);
    this.props.history.push('/');

  }

  render() {
    return (
      <div className="LandingPage">
      </div>
    );
  }
}

export default OAuthPage;
