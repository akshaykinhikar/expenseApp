import { useState } from "react";

const TodoComponent = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState({
        description: '',
        status: 'pending',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTodo((prevTodos) => ({ ...prevTodos, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(todo));
        setTodoList((todoList) => [...todoList, todo])
    }
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-sm-6 ">
                        <form onSubmit={handleSubmit} className="py-3">
                            <input type="text" name="description" className="form-control" value={todo.description} onChange={handleChange} />

                            <button className="btn btn-primary my-3" type="submit">Add Todo</button>
                        </form>
                        <label htmlFor="description">Todo's:</label>
                        {(todoList && todoList.length > 0) ? todoList.map((todo, i) => (<p key={i}>{i + 1}. {todo.description}</p>)) : <h4>Please add todo</h4>}

                    </div>
                </div>

            </div>

        </>
    )
}


export default TodoComponent