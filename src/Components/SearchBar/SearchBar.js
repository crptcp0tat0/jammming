import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:'',
      //keyPressed:'',
    }
    //this.restoreSearchTerm = this.restoreSearchTerm.bind(this)
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //restoreSearchTerm() {
    //if (this.state.searchTerm === '') {
      //return ('')
    //} else {
      //return (this.state.searchTerm)
    //}
  //}

  handleKeyPressed(event) {
    if (event.key === 'Enter'){
      this.search();
      event.preventDefault();
    }
  }

  handleTermChange(event) {
    this.setState({searchTerm: event.target.value})
    event.preventDefault();
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar" >
        <input /*value={this.restoreSearchTerm}-->*/ placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyDown={this.handleKeyPressed}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
};

export default SearchBar;
