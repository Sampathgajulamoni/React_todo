import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Forms from "./components/Forms";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    todolist: [],
  };

  componentDidMount() {
    const storedTodos = localStorage.getItem("todolist");
    if (storedTodos) {
      this.setState({ todolist: JSON.parse(storedTodos) });
    }
  }


  // Add new todo
  addTodo = (text, status, priority) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: status,
      priority,
    };

    const updatedTodos = [...this.state.todolist, newTodo];

    this.setState({ todolist: updatedTodos },
      () => {
      // Also save to localStorage
      localStorage.setItem("todolist", JSON.stringify(this.state.todolist));
    });
  };

  // Delete todo by id
  deleteTodo = (id) => {
    const updatedTodos = this.state.todolist.filter(todo => todo.id !== id);
    this.setState({ todolist: updatedTodos }, () => {
      localStorage.setItem("todolist", JSON.stringify(this.state.todolist));
    });
  };
  

  render() {
    return (
      <Routes>
        <Route path="/" element={
            <Todo
              todosList={this.state.todolist} deleteTodo={this.deleteTodo}
            />
          } />
        <Route path="/forms" element={<Forms addTodo={this.addTodo} />} />
      </Routes>
    );
  }
}

export default App;
