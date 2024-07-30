import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [skip, setSkip] = useState(0);
  const [val, setVal] = useState("");
  
  // Initially Loaded todos
  useEffect(() => {
    fetchtodos();
  }, []);

  const fetchtodos = async () => {
    const res = await fetch(`https://dummyjson.com/todos?limit=20&skip=0.`);
    const data = await res.json();
    let initialTodos = data.todos.map((todo) => ({ ...todo, completed: false }));
    setTodos(initialTodos);
  };

  // Fetch 20 todos Fn
  const fetchmore = async () => {
    const res = await fetch(`https://dummyjson.com/todos?limit=20&skip=${skip}.`);
    const data = await res.json();
    const newTodos = data.todos.map((todo) => ({ ...todo, completed: !todo.completed }));
    setSkip((prev) => prev + 20);
    setTodos([...todos, ...newTodos]);
  };

  // Task Completed Fn
  useEffect(() => {
    if (todos.length >= 100) {
      alert("Task Completed");
    }
  }, [todos]);

  const completeTask = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Add Item in list fn
  const addItems = () => {
    const newTask = {
      id: todos.length + 1,
      todo: val,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setVal(""); // Clear input field after adding task
  };

  const savelist = () => {
    localStorage.setItem('savedtodos', JSON.stringify(todos));
    alert("Saved to Local Storage");
  };

  const deleteItem = (id) => {
    const newList = [...todos];
    newList.splice(id, 1);
    setTodos(newList);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <h3>{todos.length}</h3>
      <div className="input-container">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button onClick={addItems}>Add</button>
      </div>
      <div>
        {todos.map((todo, id) => (
          <div
            key={id}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
            className={todo.completed ? "notdone" : "done"}
          >
            <p>{todo.todo}</p>
            <button onClick={() => completeTask(todo.id)}>Completed</button>
            <button onClick={() => deleteItem(id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={savelist}>Save</button>
      {todos.length < 100 ? (
        <button onClick={fetchmore}>Load More</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
