import React from "react";
import Search from "./Search";
import Sort from "./Sort";

class SearchAndSort extends React.Component {
  render() {
    return (
      <div className="row">
        {/* Search */}
        <Search onSearch={this.props.onSearch} />

        {/* Sort */}
        <Sort onSort={this.props.onSort}/>
        </div>
    );
  }
}

export default SearchAndSort;
