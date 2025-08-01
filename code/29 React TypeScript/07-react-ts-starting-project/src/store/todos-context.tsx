import React, { useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
    items: Todo[], 
    addTodo: (text:string) => void,
    removeTodo: (id:string) => void
}

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: (id:string) => {}
})

const TodoContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([])

    const addToDoHandler = (todoText:string) => {
        const newTodo = new Todo(todoText)

        setTodos((prevTodos) => {
        return prevTodos.concat(newTodo)
        })
    }

    const removeTodoHandler = (toDoId:string) => {
        setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.id !== toDoId)
        })
    }

    const contextValue:TodosContextObj = {
        items: todos,
        addTodo: addToDoHandler,
        removeTodo: removeTodoHandler
    }

    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
}

export default TodoContextProvider