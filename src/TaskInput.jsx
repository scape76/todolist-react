import React, { Component } from "react";

class TaskInput extends Component {
  state = {
    value: ''
  }

  handleChange = (event) => {
    this.setState(state => state.value === event.target.value ? null : {value: event.target.value})
  }

  handleTaskCreate = () => {
    this.props.onCreate(this.state.value)
    this.setState((state) => state.value === ''
      ? null
      : {value: ''})
  }

  render() {
    return (
      <div className="create-task">
        <input className="create-task__input" type="text" value={this.state.value} onChange={this.handleChange}/>
        <button className="btn create-task__btn" onClick={this.handleTaskCreate}>Create</button>
      </div>
    )
  };
}

export default TaskInput;
