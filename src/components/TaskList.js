import React from "react";
import TaskItem from "./TaskItem";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  }
  render() {
    var tasks = this.props.tasks;
    var elements = tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          updateStatus={this.props.updateStatus}
          deleteItem={this.props.deleteItem}
          updateTask={this.props.updateTask}
        />
      );
    });
    return (
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th className="text-center">Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={this.state.filterName}
                onChange={this.onChange}
              ></input>
            </td>
            <td>
              <select
                name="filterStatus"
                id="input"
                class="form-control"
                required="required"
                value={this.state.filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>All</option>
                <option value={0}>Hide</option>
                <option value={1}>Show</option>
              </select>
            </td>
            <td></td>
          </tr>

          {elements}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
