import { useState } from "react"
import "./App.css"

function Todo(props) {
    return (
        <div className="Todo">
            <h3>{props.todo.title}</h3>
            <p>{props.todo.content}</p>
            <p>{props.todo.isDone ? "완료" : "미완료"}</p>
            <button onClick={() => props.handleComplete(props.todo.id)}>
                완료하기
            </button>
            <button onClick={() => props.handleDelete(props.todo.id)}>
                삭제하기
            </button>
        </div>
    )
}

function App() {
    const [number, setNumber] = useState(3)
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "제목1",
            content: "내용2",
            isDone: false
        },
        {
            id: 2,
            title: "제목2",
            content: "내용2",
            isDone: true
        }
    ])

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("form submitted")
    }

    const addTodoHandler = () => {
        const newTodo = {
            id: number,
            title: title,
            content: content,
            isDone: false
        }
        setNumber(number + 1)

        setTodos([...todos, newTodo])
    }

    const completeTodoHandler = (id) => {
        let todo = todos.filter((todo) => todo.id === id)[0]
        console.log(todo)
        todo.isDone = true
        let todoListWithoutNewTodo = todos.filter((todo) => todo.id !== id)
        todoListWithoutNewTodo.push(todo)
        setTodos(todoListWithoutNewTodo)
    }

    const deleteTodoHandler = (id) => {
        const newTodoList = todos.filter((todo) => todo.id !== id)
        setTodos(newTodoList)
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>To-do list</h1>
            </header>
            <div className="Todo-input">
                <form onSubmit={handleSubmit}>
                    <label>
                        제목:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        내용:
                        <input
                            type="text"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <button type="submit" onClick={addTodoHandler}>
                        추가
                    </button>
                </form>
            </div>
            <div className="Todos">
                {todos.map((todo) => {
                    return (
                        <Todo
                            todo={todo}
                            key={todo.id}
                            handleDelete={deleteTodoHandler}
                            handleComplete={completeTodoHandler}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App
