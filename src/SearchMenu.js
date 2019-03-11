import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import APIManager from './APIManager.js';


class SearchMenu extends Component {
  constructor(props) {
    super(props);
    APIManager.setCurrentTab('artist');
    this.state = {
      selectedIndex: 'ARTISTS',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, {name}) {
    this.setState({selectedIndex: name});
    // now we need to call the callback function to do routing
    if (name === 'ARTISTS') {
      APIManager.setCurrentTab('artist');
    } else if (name === 'SONGS') {
      APIManager.setCurrentTab('song');
    } else {
      APIManager.setCurrentTab('album');
    }
  }


  render() {
    return (
      <Menu widths={3} fluid inverted>
        <Menu.Item
          as={Link}
          to='/search/artist'
          name='ARTISTS'
          active={this.state.selectedIndex === 'ARTISTS'}
          onClick={this.handleClick}
        />
        <Menu.Item
          as={Link}
          to='/search/song'
          name='SONGS'
          active={this.state.selectedIndex === 'SONGS'}
          onClick={this.handleClick}
        />
        <Menu.Item
          as={Link}
          to='/search/album'
          name='ALBUMS'
          active={this.state.selectedIndex === 'ALBUMS'}
          onClick={this.handleClick}
        />
      </Menu>
    );
  }
}

export default SearchMenu;
