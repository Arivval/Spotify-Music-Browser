import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestingLogin: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({requestingLogin: true});
    let redirectURL = 'https://arivval.github.io/rkmp2Test/';
    // window.location = 'https://accounts.spotify.com/authorize?client_id=4ed1e929dd444b11a2a7f9d1d4657fba&response_type=token&redirect_uri=http://localhost:3000/rkmp2Test/';
    window.location = 'https://accounts.spotify.com/authorize?client_id=4ed1e929dd444b11a2a7f9d1d4657fba&response_type=token&redirect_uri=' + redirectURL;

  }

  render() {
    if (this.state.requestingLogin) {
      return (<div>
        <Button positive="positive" loading="loading" size="massive">
          Spotify Login
        </Button>
      </div>);
    } else {
      return (<div>
        <Button positive onClick={this.handleClick} size="massive">
          Spotify Login
        </Button>
      </div>);
    }
  }

}

export default LoginButton;
