// frontend/src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Fetch tasks after adding a new task
          fetchTasks();
          // Clear the input
          setTask("");
        } else {
          console.error("Error adding task:", data.error);
        }
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>TO DO LIST APP</h1>
      <form>
        <label for="todo">
          <button id="entertask">Enter Task:</button>
        </label>
        <input id="todo" type="text" value={task} onChange={handleTaskChange} />
        <button id="addtask" onClick={handleAddTask}>
          Add Task
        </button>
        <ul className="tlist">
          {tasks.map((t, index) => (
            <li key={index}>{t}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;
