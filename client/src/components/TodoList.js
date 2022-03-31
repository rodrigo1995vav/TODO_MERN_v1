import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { addTask, deleteTask, getTasks, updateTask } from '../services/taskServices';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    tasks();
  },[]);

  const tasks = async() => {
        const response = await getTasks()
        const data = await response.data
        setTodos(data)
    }
  const addTodo = async (todo) => {
    if (!todo.task || /^\s*$/.test(todo.task)) {
      return;
    }
    await addTask({ task:todo.task })
    const response = await getTasks()
    const data = await response.data

    const lastTask = data[data.length - 1]
    console.log(lastTask)
    const newTodos = [lastTask, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {

    if (!newValue.task || /^\s*$/.test(newValue.task)) {
      return;
    }
    updateTask(todoId,{ "task":newValue.task, "completed":"false" })
    const newActVal = {
      _id:todoId,
      task:newValue.task,

    }

    setTodos(prev => prev.map(item => (item._id === todoId ? newActVal : item)));
    console.log("ded",newValue)
    console.log("ACTUAL VALUE", newActVal)
    
  };

  const removeTodo = id => {
    deleteTask(id)
    const removedArr = [...todos].filter(todo => todo._id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo._id === id) {
        todo.completed = !todo.completed;
        const completedSwitch = {
          "completed":todo.completed
        }
        updateTask(todo._id,completedSwitch)
      }
      
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's popping today bruh?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;