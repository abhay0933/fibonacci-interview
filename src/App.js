import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {

  const[todos, setTodos] = useState([]);
  const [skip, setSkip] = useState(0);
  const[val, setVal] = useState("");
  const [completed, setCompleted] = useState(true);
  const [copy, setCopy] = useState([]);

  // Initially Loaded todos
  useEffect(() => {
    fetchtodos();
  }, []);

  const fetchtodos = async () => {
    const res = await fetch(`https://dummyjson.com/todos?limit=20&skip=0.`);
    const data = await res.json();
    // setTodos(data.todos);
    let copy = data.todos.map((todo) => ({...todo, completed: true}));
    // setTodos(prev => prev.map((todo) => ({...todo, completed: true})))
    setTodos(copy)
    // console.log(copy);
  }

// Fetch 20 todos Fn
  const fetchmore = async () => {
    const res = await fetch(`https://dummyjson.com/todos?limit=20&skip=${skip}.`);
    const data = await res.json();
    setSkip(prev => prev+20);
    setTodos([...todos, ...data.todos]);
  };

  // Task Completed Fn
  useEffect(() => {
    if(todos.length >= 100) {
      alert("Task Completed")
    }
  }, [todos]);

  const completeTask = (id) => {
    const task = todos.find(todo => todo.id == id);
    if(task) {
      setCompleted(!completed);
      console.log("helo");
    }
  }

  // Add Item in list fn
  const addItems = () => {
      const newTask = {
        id: todos.length+1,
        todo: val
      }
      setTodos([...todos, newTask])
      // console.log(todos);
  };

  const savelist = () => {
    localStorage.setItem('savedtodos', JSON.stringify(todos));
    alert("Saved to Local Storage");
  };

  const deleteItem = (id) => {
    const newList = [...todos];
    newList.splice(id, 1);
    setTodos(newList);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <h3>{todos.length}</h3>
      <div className='input-container'>
        <input type='text' onChange={(e) => setVal(e.target.value)}/>
        <button onClick={addItems}>Add</button>
      </div>
      <div>
        {
          todos.map((todo, id) => (
            <div key={id} style={{display: "flex", alignItems: "center", gap: "6px"}} className= {completed ? "done" : "notdone"}>
              <p contentEditable>{todo.todo}</p>
              <button onClick={() => completeTask(todo.id)}>Completed</button>
              <button onClick={() => deleteItem(id)}>Delete</button>
            </div>
          ))
        }
      </div>
      <button onClick={savelist}>Save</button>
      {
        todos.length < 100 ? (<button onClick={fetchmore}>Load More</button>) : (<></>)
      }
    </div>
  );
};

export default App;
