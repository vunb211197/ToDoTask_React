import React from "react";

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keyWord : ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(e){
    var k = e.target.value;
    this.setState({
      keyWord : k
    });
  }

  onSearch(){
    this.props.onSearch(this.state.keyWord);
  }

  render() {
    var keyWord = this.setState.keyWord;
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputAmount"
                placeholder="Enter your key"
                value = {keyWord}
                onChange = {this.onChange}
              />
              <span className="input-group-btn">
                <button type="button" className="btn btn-primary" onClick = {this.onSearch}>
                  <span className="fa fa-search"></span>&nbsp;Search
                </button>
              </span>
            </div>
          </div>
        </div>
    );
  }
}

export default Search;
