import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, deleteTodo, unCompleteTodo } from './Actions/TodoActions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: '',
      filter: 'all'
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const state = this.state;
    const name = event.target.name;
    const value = event.target.value;

    state[name] = value;
    this.setState(state);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.addTodo(this.state.currentTodo);
    this.setState({ currentTodo: '' });
  }

  todoClick(id, completed) {
    if (completed)
      this.props.uncompleteTodo(id);
    else
      this.props.completeTodo(id);
  }

  render() {
    const nonCompleted = (<i className="far fa-circle icon"></i>);
    const completed = (<i className="far fa-times-circle icon"></i>);
    const remove = id => (
      <button onClick={() => this.props.deleteTodo(id)} className="remove-btn">
        <i className="fas fa-times ion"></i>
      </button>
    );

    let comparison;

    switch (this.state.filter) {
      case 'all': {
        comparison = () => true;
        break;
      }
      case 'completed': {
        comparison = todo => todo.completed === true;
        break;
      }
      case 'non-completed': {
        comparison = todo => todo.completed === false;
        break;
      }
      default: break;
      
    }


    const todos = this.props.todos.filter(comparison).map((todo, id) => (
      <p key={todo.id} onClick={() => this.todoClick(todo.id, todo.completed)} className={todo.completed ? 'note-body underlined noselect' : 'note-body noselect'}>
        {todo.completed ? completed : nonCompleted}
        {todo.text}
        {remove(todo.id)}
      </p>
    ));

    return (
      <div className="container">
        <div className="todo-container">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="far fa-sticky-note"></i></span>
            </div>
            <input type="text" name="currentTodo" value={this.state.currentTodo} onChange={this.onChange} className="form-control" placeholder="Следваща бележка" />
          </div>

          <button onClick={this.onSubmit} type="button" className="btn btn-secondary btn-lg btn-block">Добави</button>
          <div className="notes-container">
            {todos}
            <div className="btnContainer">
              <button className="btn btn-success" onClick={() => this.setState({ filter: 'completed' })}>Завършени</button>
              <button className="btn btn-success" onClick={() => this.setState({ filter: 'non-completed' })}>Незавършени</button>
              <button className="btn btn-success" onClick={() => this.setState({ filter: 'all' })}>Всички</button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToprops = dispatch => ({
  addTodo: text => dispatch(addTodo(text)),
  deleteTodo: id => dispatch(deleteTodo(id)),
  completeTodo: id => dispatch(completeTodo(id)),
  uncompleteTodo: id => dispatch(unCompleteTodo(id))
});

export default connect(mapStateToProps, mapDispatchToprops)(App);
