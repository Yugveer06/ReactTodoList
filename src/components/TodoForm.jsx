import React, { useState } from "react";

function TodoForm({ addTodo }) {
	const [task, setTask] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (!task.trim()) return;
		addTodo({ id: Date.now(), task, completed: false });
		setTask("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex p-4 gap-2 items-center w-full'
		>
			<input
				type='text'
				value={task}
				onChange={e => setTask(e.target.value)}
				placeholder='Add a new task...'
				className='border border-slate-200 p-2 rounded w-full'
			/>
			<button
				type='submit'
				className='bg-indigo-500 text-white px-4 py-2 rounded'
			>
				+
			</button>
		</form>
	);
}

export default TodoForm;
