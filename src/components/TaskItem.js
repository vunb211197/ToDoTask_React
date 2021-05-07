import React from "react";

class TaskItem extends React.Component {
  constructor(props){
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  updateStatus(){
    this.props.updateStatus(this.props.task.id);
  }

  deleteItem(){
    this.props.deleteItem(this.props.task.id);
  }

  updateTask(){
    this.props.updateTask(this.props.task.id);
  }

  render() {
    var task = this.props.task;
    var index = this.props.index;
    return (
      <tr>
        <td>{index +1 }</td>
        <td>{task.name}</td>
        <td className="text-center">
          <button onClick={this.updateStatus} type="button" className={task.status === true ? 'label label-danger' : 'label label-success'}>
            {task.status === true ? 'Show' : 'Hide'}
          </button>
        </td>
        <td className="text-center">
          <button type="button" class="btn btn-warning" onClick = {this.updateTask}>
            <span className="fa fa-pencil"></span>&nbsp;Update
          </button>
          &nbsp;
          <button type="button" class="btn btn-danger" onClick={this.deleteItem}>
            <span className="fa fa-trash"></span>&nbsp;Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
