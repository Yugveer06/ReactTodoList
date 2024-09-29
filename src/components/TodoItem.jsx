import { Check } from "lucide-react";
import { Trash2, Pencil } from "lucide-react";
import React, { useState } from "react";

function TodoItem({ todo, deleteTodo, editTodo }) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTask, setNewTask] = useState(todo.task);

	const handleEdit = e => {
		e.preventDefault();
		editTodo(todo.id, { task: newTask });
		setIsEditing(false);
	};

	const handleComplete = () => {
		editTodo(todo.id, { completed: !todo.completed });
	};

	return (
		<div className='flex justify-between w-full gap-1'>
			<div className='flex-1'>
				{isEditing ? (
					<form
						onSubmit={handleEdit}
						className='flex flex-col justify-center w-full gap-2'
					>
						<input
							type='text'
							value={newTask}
							onChange={e => setNewTask(e.target.value)}
							className='border border-gray-300 p-2 rounded w-full'
						/>
						<button
							type='submit'
							className='flex align-center justify-center bg-green-500 text-white px-3 py-2 rounded'
						>
							<Check size={16} />
						</button>
					</form>
				) : (
					<span
						className={`flex-1 ${
							todo.completed ? "line-through" : ""
						}`}
					>
						<input
							type='checkbox'
							checked={todo.completed}
							onChange={handleComplete}
							className='mr-2'
						/>
						{todo.task}
					</span>
				)}
			</div>

			<div className='flex space-x-2'>
				<button
					onClick={() => setIsEditing(!isEditing)}
					className='bg-indigo-500 text-white px-3 py-2 rounded'
				>
					<Pencil size={16} />
				</button>
				<button
					onClick={() => deleteTodo(todo.id)}
					className='bg-red-500 text-white px-3 py-2 rounded'
				>
					<Trash2 size={16} />
				</button>
			</div>
		</div>
	);
}

export default TodoItem;
