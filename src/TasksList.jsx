import React, { Component } from "react";
import Task from "./Task";
import TaskInput from './TaskInput';
import WithGateway from "./WithGateway";

class TasksList extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      tasks: [],
    }
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks = () => {
    this.props.fetchData()
      .then(tasksList => this.setState({
        tasks: tasksList
        .map(({text, done, _id}) => ({text, done, id: _id})),
      }));
  }

  handleTaskCreate = (text) => {
    if(text === '') {
      return
    }
    const newTask = {
      text,
      done: false
    };

    this.props.createData(newTask)
      .then(tasks => this.fetchTasks());
  }

  handleTaskStatusChange = (id) => {
    const {done, text} = this.state.tasks
      .find(task => task.id === id);
    const updatedTask = {
      text,
      done: !done
    }

    this.props.updateData(id, updatedTask)
      .then(tasks => this.fetchTasks());
  }

  handleTaskDelete = (id) => {
    this.props.deleteData(id)
      .then(tasks => this.fetchTasks())
  }
 
  render() {
    const sortedArray = [...this.state.tasks]
      .sort((a, b) => a.done - b.done); 
    return (
      <main className="todo-list">
        <TaskInput onCreate={this.handleTaskCreate}/>
        <ul className="list">
          {sortedArray.map(task => 
            <Task key={task.id} {...task}  
            onChange={this.handleTaskStatusChange}
            onDelete={this.handleTaskDelete}/> 
          )}
        </ul>
        </main>
    )
  };
}

export default WithGateway(TasksList, `https://crudcrud.com/api/c0521f4416b7486a809ed95c4db6f96f/tasks`);