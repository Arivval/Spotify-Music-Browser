import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringEntered: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    // we have to do this or else the page would refresh
    e.preventDefault();
    this.props.searchCallBack(this.state.stringEntered, true);
  }

  handleChange(e) {
    this.setState({stringEntered: e.target.value});
    this.props.searchCallBack(e.target.value, false);

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ui inverted left icon input large">
          <input type="text" placeholder={this.props.placeholder} onChange={this.handleChange}/>
          <i className="search icon"/>
        </div>
      </form>
    );
  }

}

SearchBar.propTypes = {
  searchCallBack: PropTypes.func.isRequired,
}

export default SearchBar;
