import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { motion as m } from "framer-motion";

function TodoWrapper() {
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		return savedTodos ? JSON.parse(savedTodos) : [];
	});
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = todo => {
		setTodos([...todos, todo]);
	};

	const deleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	const editTodo = (id, updatedTodo) => {
		setTodos(
			todos.map(todo =>
				todo.id === id ? { ...todo, ...updatedTodo } : todo
			)
		);
	};

	const filteredTodos = todos.filter(todo => {
		if (filter === "completed") return todo.completed;
		if (filter === "pending") return !todo.completed;
		return true; // "all"
	});

	return (
		<m.div className='bg-slate-100 border border-slate-200 rounded-lg overflow-hidden w-[96vw] max-w-[540px]'>
			<header className='p-4 border-b'>
				<h1 className='text-2xl font-bold text-center text-slate-950'>
					Todo List
				</h1>
			</header>
			<div className='flex justify-center'>
				<TodoForm addTodo={addTodo} />
			</div>
			<div className='flex gap-2 px-4 mb-4'>
				{["all", "completed", "pending"].map(f => (
					<button
						key={f}
						onClick={() => setFilter(f)}
						className={`${
							filter === f ? "text-indigo-500" : "text-slate-900"
						} text-white px-4 py-2 rounded relative`}
					>
						{f.charAt(0).toUpperCase() + f.slice(1)}
						{filter === f && (
							<m.div
								layoutId='selectedFilterUnderline'
								className='absolute bottom-0 left-0 h-0.5 w-full bg-indigo-500'
							></m.div>
						)}
					</button>
				))}
			</div>
			<m.div
				initial={{ height: 0 }}
				animate={{ height: filteredTodos.length ? "auto" : 64 }}
				transition={{ duration: 0.3 }}
				className='flex flex-wrap justify-center overflow-hidden'
			>
				<TodoList
					todos={filteredTodos}
					deleteTodo={deleteTodo}
					editTodo={editTodo}
				/>
			</m.div>
			<Footer />
		</m.div>
	);
}

export default TodoWrapper;
