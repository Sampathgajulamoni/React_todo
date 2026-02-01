import Header from "../Header";
import "./index.css";
import React, { useEffect, useState } from "react";

const tabsList = [
  { tabId: "all", displayText: "All" },
  { tabId: "active", displayText: "Active" },
  { tabId: "completed", displayText: "Completed" },
];

const Todo = (props) => {
  const { todosList } = props;

  const getTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  const [searchText, setSearchText] = useState("");

  const filteredTodos = todosList.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="todos-container">
        <h1 className="todos-list-title">TodoList</h1>

        <h2>
          Time Left Today: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </h2>

        <input
          type="text"
          placeholder="Search task..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Text</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
             {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.text}</td>
                  <td>{todo.completed ? "Completed" : "Active"}</td>
                  <td>{todo.priority}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Todo;
