import React from "react";

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "name",
      sortValue: 1,
    };
  }

  onClick(sortBy, sortValue) {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
    this.props.onSort(sortBy,sortValue);
  }

  render() {
    var sortBy = this.state.sortBy;
    var sortValue = this.state.sortValue;
    var check_sort = 1;
    if(sortBy === 'name' && sortValue === -1){
      check_sort = 2;
    }else if (sortBy === 'status' && sortValue === 1){
      check_sort = 3;
    }else if(sortBy === 'status' && sortValue === -1){
      check_sort = 4;
    }else{
      check_sort = 1;
    }
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            Sort by &nbsp;
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li onClick={this.onClick.bind(this, "name", 1)}>
              <a role="button" className={check_sort ===1 ? "sort_selected" : ""} >
                <span
                  className="fa fa-sort-alpha-asc "
                  aria-hidden="true"
                ></span>
                {""}
                &nbsp;A to Z
              </a>
            </li>
            <li onClick={this.onClick.bind(this, "name", -1)}>
              <a role="button" className={check_sort === 2 ? "sort_selected" : ""}>
                <span className="fa fa-sort-alpha-desc"></span>&nbsp; Z to A
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li onClick={this.onClick.bind(this, "status", 1)}>
              <a role="button" className={check_sort === 3 ? "sort_selected" : ""} >Show status</a>
            </li>
            <li onClick={this.onClick.bind(this, "status", -1)}>
              <a role="button" className={check_sort === 4 ? "sort_selected" : ""}>Hide status</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
