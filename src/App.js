import "./App.css";
import React from "react";
import TaskForm from "./components/TaskForm";
import SearchAndSort from "./components/SearchAndSort";
import TaskList from "./components/TaskList";
class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.state = {
        tasks: tasks,
        isDisplayForm: false,
        taskEditing: null,
        filter: {
          name: "",
          status: -1,
        },
        keyWord: "",
        sort: {
          by: "name",
          value: 1,
        },
      };
    } else {
      this.state = {
        tasks: [],
        isDisplayForm: false,
        taskEditing: null,
        filter: {
          name: "",
          status: -1,
        },
        keyWord: "",
        sort: {
          by: "name",
          value: 1,
        },
      };
    }

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.findIndex = this.findIndex.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  // gọi khi các component được gắn vào ( tải lại trang - gọi vào 1 lần duy nhất)
  // componentDidMount() {
  //   //  có thể thực hiện gán giá trị state ở đây hoặc gắn khi khởi tạo
  // }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  showForm() {
    this.setState({
      isDisplayForm: true,
      taskEditing: null,
      keyWord: "",
    });
  }
  hideForm() {
    console.log("123");
    this.setState({
      isDisplayForm: false,
    });
  }

  randomId() {
    return (
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4()
    );
  }

  onSubmit(data) {
    console.log(data);
    var tasks = this.state.tasks;
    if (data.id === "") {
      //  khởi tạo thằng task để nó thêm vào element
      data.id = this.randomId();
      tasks.push(data);
      // gọi qua thằng này để nó tự cập nhật lại thông số state ( chứ nếu this.state.tasks.push(data) thì nó ko tự cập nhật)
      this.setState({
        tasks: tasks,
      });
    } else {
      var index = this.findIndex(data.id);
      if (index !== -1) {
        tasks[index].name = data.name;
        tasks[index].status = data.status;
        this.setState({
          tasks: tasks,
        });
      }
    }
    // console.log(this.state.tasks);
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  updateStatus(id) {
    var index = this.findIndex(id);
    var tasks = this.state.tasks;
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      // console.log(this.state.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  findIndex(id) {
    var tasks = this.state.tasks;
    var rs = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        rs = index;
      }
    });
    return rs;
  }

  deleteItem(id) {
    var index = this.findIndex(id);
    var tasks = this.state.tasks;
    if (index !== -1) {
      // xóa trong javascript
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      // console.log(this.state.tasks);
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      this.hideForm();
    }
  }

  updateTask(id) {
    var index = this.findIndex(id);
    var tasks = this.state.tasks;
    this.setState({
      taskEditing: tasks[index],
    });
    this.showUpdateForm();
  }

  showUpdateForm() {
    this.setState({
      isDisplayForm: true,
    });
  }

  onFilter(filterName, filterStatus) {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus,
      },
      keyWord: "",
    });
  }

  onSearch(keyWord) {
    this.setState({
      keyWord: keyWord,
    });
  }

  onSort(sortBy, sortValue) {
    console.log(sortBy,sortValue);
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });

  }

  render() {
    var tasks = this.state.tasks;
    var isDisplayForm = this.state.isDisplayForm;
    var checkDisplayForm = "";
    var classForm = "";
    var classTaskList = "";
    var filter = this.state.filter;
    var key = this.state.keyWord;
    var sort = this.state.sort;

    // kiểm tra nếu filter name khác mặc định
    if (filter.name !== "") {
      tasks = tasks.filter(
        (task) =>
          task.name.toLowerCase().indexOf(filter.name.toLocaleLowerCase()) !==
          -1
      );
    }
    // kiểm tra nếu filter status khác mặc định
    if (filter.status !== -1) {
      let filer_status = filter.status === 0 ? false : true;
      tasks = tasks.filter((task) => task.status === filer_status);
    }

    //  kiểm tra nếu có search
    if (key !== "") {
      // filter task java script
      tasks = tasks.filter(
        (task) =>
          task.name.toLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      );
    }

    if (isDisplayForm) {
      //  nếu mà bắt thằng function bên component con thì nó sẽ ko chạy vào render luôn mà làm các thứ rồi mới render , nên nó sẽ ko chạy vào đây
      checkDisplayForm = (
        <TaskForm
          haha={this.hideForm}
          onSubmit={this.onSubmit}
          task={this.state.taskEditing}
        />
      );
      classForm = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
      classTaskList = "col-xs-8 col-sm-8 col-md-8 col-lg-8";
    } else {
      checkDisplayForm = "";
      classForm = "";
      classTaskList = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
    }

    // hàm sort trong java script
    if (sort.by === "name") {
      var points = [100, 40, 1, 5, 25, 10];
      points.sort(function (a, b) {
        return a - b;
      });
      console.log(points);

      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else {
          return 0;
        }
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else {
          return 0;
        }
      });
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>To Do Task By VuNB</h1>
          <hr />
        </div>
        <div className="row">
          <div className={classForm}>{checkDisplayForm}</div>
          <div className={classTaskList}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.showForm}
            >
              <span className="fa fa-plus"></span> &nbsp;Add Task
            </button>
            <br></br>
            <br></br>
            <SearchAndSort onSearch={this.onSearch} onSort={this.onSort} />
            <br></br>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  updateStatus={this.updateStatus}
                  deleteItem={this.deleteItem}
                  updateTask={this.updateTask}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
