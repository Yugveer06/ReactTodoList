import React from "react";
import TodoItem from "./TodoItem";
import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function TodoList({ todos, deleteTodo, editTodo }) {
	return (
		<m.ul className='p-4 w-full'>
			<AnimatePresence>
				{todos.length === 0 ? (
					<m.li
						className='text-center text-gray-500'
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						No Tasks
					</m.li>
				) : (
					todos.map((todo, index) => (
						<m.li
							key={todo.id}
							initial={{
								opacity: 0,
								height: 0,
								paddingTop: 0,
								paddingBottom: 0,
							}}
							animate={{
								opacity: 1,
								height: "auto",
								paddingTop: 8,
								paddingBottom: 8,
							}}
							exit={{
								opacity: 0,
								height: 0,
								paddingTop: 0,
								paddingBottom: 0,
							}}
							transition={{ duration: 0.1, delay: index * 0.05 }}
							className={`flex items-center justify-between ${
								index === todos.length - 1 ? "" : "border-b"
							}`}
						>
							<TodoItem
								todo={todo}
								deleteTodo={deleteTodo}
								editTodo={editTodo}
							/>
						</m.li>
					))
				)}
			</AnimatePresence>
		</m.ul>
	);
}

export default TodoList;
