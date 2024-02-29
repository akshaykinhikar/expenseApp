import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, selectTodoList } from "../app/features/todo/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const TodoComponent = () => {
    const todoList = useSelector(selectTodoList);
    const dispatch = useDispatch();

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
        dispatch(addTodo(todo));
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
                        {(todoList && todoList.length > 0) ? todoList.map((todo, i) => (
                            <div className="row">
                                <div className="col-sm-10 ">
                                    <p key={i} >{i + 1}. {todo.description}</p>
                                </div>
                                <div className="col-sm-2">
                                    <FontAwesomeIcon onClick={() => dispatch(deleteTodo(i))} icon={faTrash} />
                                </div>
                            </div>
                        )) : <h4>Please add todo</h4>}

                    </div>
                </div>

            </div>

        </>
    )
}


export default TodoComponent