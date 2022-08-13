import React from "react";
import TasksList from "./TasksList";

const TodoList = (props) => {
  return (
    <>
    <h1 className="title">Todo List</h1>
    <TasksList/>
    </>
  );
} 

export default TodoList;