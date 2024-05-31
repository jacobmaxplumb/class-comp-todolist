import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: "",
    };
  }

  componentDidMount() {
    this.getTodoItems();
  }

  async getTodoItems() {
    const { data } = await axios.get("http://localhost:9000/todos");
    this.setState({ todos: data });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  async addTodoItem() {
    const body = { text: this.state.text, completed: false };
    const { data } = await axios.post("http://localhost:9000/todos", body);
    this.setState({ todos: [...this.state.todos, data] });
  }

  async handleTodoClick(todo) {
    if (todo.completed) {
      await axios.delete(`http://localhost:9000/todos/${todo.id}`);
    } else {
      const todoCopy = {...todo};
      todoCopy.completed = true;
      const { data } = await axios.put(`http://localhost:9000/todos/${todo.id}`, todoCopy);
    }
    this.getTodoItems();
  }

  render() {
    return (
      <>
        <h1>Todo List</h1>
        <input
          value={this.state.text}
          onChange={(e) => this.handleTextChange(e)}
        />
        <button onClick={() => this.addTodoItem()}>Add</button>
        <ul>
          {this.state.todos.map((todo) => (
            <li
              onClick={() => this.handleTodoClick(todo)}
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
              key={todo.id}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;
