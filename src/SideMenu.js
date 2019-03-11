import React, {Component} from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import APIManager from './APIManager.js';


class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 'Your Library',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, {name}) {
    this.setState({selectedIndex: name});

    // now we need to call the callback function to do routing
  }


  render() {
    return (
      <Menu pointing fluid vertical secondary inverted size='massive'>
        <Menu.Item
          as={Link}
          to='/rkmp2Test/'
          name='Your Library'
          active={this.state.selectedIndex == 'Your Library'}
          onClick={this.handleClick}
        >
          Browse Playlists
          <Icon name='bookmark outline'/>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/rkmp2Test/new'
          name='Home'
          active={this.state.selectedIndex == 'Home'}
          onClick={this.handleClick}

        >
          <Icon name='level up'/>
          New Releases
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/rkmp2Test/search'
          name='Search'
          active={this.state.selectedIndex == 'Search'}
          onClick={this.handleClick}


        >
          <Icon name='search'/>
          Search
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu;
