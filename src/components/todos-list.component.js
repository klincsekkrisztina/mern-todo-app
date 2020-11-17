import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//implement Todo component in the same file,
// because it will be used only as a child component of TodoList component
//it is a functional component

//props is getting passed in as an argument of the function
const Todo = props => (
	<tr>
		<td>{props.todo.todo_description}</td>
		<td>{props.todo.todo_responsible}</td>
		<td>{props.todo.todo_priority}</td>
		<td>
			<Link to={"/edit/"+props.todo._id}>Edit</Link>
		</td>
	</tr>
)


export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {todos: []};
	}

	//send GET request to the endpont, in response we get tle list of todos
	componentDidMount() {
		axios.get('http://localhost:4000/todos/')
			.then(response => {
				this.setState({todos: response.data});
			})
			.catch(function(error) {
				console.log(error);
			})
	}

	todoList() {
		return this.state.todos.map(function(currentTodo, i) {
			return <Todo todo={currentTodo} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<h3>Todos list</h3>
				<table className="table table-striped" style={{ margintop: 20 }}>
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Priority</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{ this.todoList() }
					</tbody>
				</table>
			</div>
		)
	}
}