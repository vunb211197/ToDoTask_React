import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.hideForm = this.hideForm.bind(this);
    // if (this.props.task == null) {
    //   this.state = {
    //     id: "",
    //     name: "",
    //     status: false,
    //   };
    // } else {
    //   this.state = {
    //     id: this.props.task.id,
    //     name: this.props.task.name,
    //     status: this.props.task.status,
    //   };
    // }

    this.state = {
      id: "",
      name: "",
      status: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  hideForm() {
    this.props.haha();
  }

  onChange(e) {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    // cancel and close form
    this.onClear();
    this.hideForm();
  }

  //   reset khi ấn cancel
  onClear() {
    this.setState({
      name: "",
      status: false,
    });
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.task) {
  //     if(props.task.id !== state.id){
  //       return {
  //         id: props.task.id,
  //         name: props.task.name,
  //         status: props.task.status
  //       }
  //     }
  //   }else{
  //     if(state.id){
  //       return {
  //         id: '',
  //         name: '',
  //         status: true
  //       }
  //     }
  //   }
  //   return null
  // }

  // có sự thay đổi props của phía components 
  // sửa -> thêm 
  // thêm -> sửa
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // nếu tồn tại task ( tức là lúc ấn update)
    // add ---->update
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      });
    // update ----->add
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }

  render() {
    var titleForm = this.props.task !== null ? "Update Task" : "Add task";
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            <div className="row">
              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <h3 className="panel-title">{titleForm}</h3>
              </div>

              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <span className=" fa fa-times-circle" onClick={this.hideForm} />
              </div>
            </div>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor>Name : </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Input name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <label htmlFor>Status : </label>
              <select
                name="status"
                id="input"
                className="form-control"
                required="required"
                value={this.state.status}
                onChange={this.onChange}
              >
                {/* để {true} để lấy kiểu boolean - nếu ko mặc định string */}
                <option value={true}>Show</option>
                <option value={false}>Hide</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Add
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.onClear}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
