import React from "react";
import { useState, useEffect} from "react";


//create your first component
const Home = () => {
	const[input, setInput] = useState("") 
	const [todos, setTodos] = useState([])
	useEffect(async()=> {
		let response = await fetch("https://playground.4geeks.com/todo/users/stewart")
		let data= response.json
		if(data.name=="stewart"){
			setTodos(data.todos)
		}
		else if(data.detail.length != 0){
			createUser()
		}
	}, [])
	async function createUser(){
		let response = await fetch("https://playground.4geeks.com/todo/users/stewart", {
			headers: {"Content-Type":"application/json"},
			method: "POST"
		})
	}
	async function addTodo(){
		let task = {label: input, is_done: false}
		let response = await fetch("https://playground.4geeks.com/todo/todos/stewart",{
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify(task)
		})
		let data = await response.json()
		setTodos([...todos, data]);
		setInput("");
	}
	async function deleteTodo(id){
		let response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
			method: "DELETE",
			headers: {"Content-Type":"application/json"},
		})
		
		
		let newTodos=todos.filter((todo,index)=>todo.id !== id)
		setTodos(newTodos)
		console.log(todos)
	}
	return (
		<div className="text-center">
			<input onChange={(e)=>setInput(e.target.value)} value={input}></input>
			<button onClick={()=> addTodo()}>Add Todo</button>
			<div>
				{todos.map((todo, index) => (
                    <div key={index}>{todo.label}
					<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					</div>
					
                ))}
			</div>
		</div>
	);
};

export default Home;
