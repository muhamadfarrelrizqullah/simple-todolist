import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import todoImage from './images/hell.jpg'
import { BsCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };  

    return (
        <div className="home">
            <h2>Simple To Do List</h2>
            <img src={todoImage} alt="To-Do List" style={{ width: '200px', marginBottom: '20px' }} />
            <Create />
            {
                todos.length === 0 
                ? (
                    <div><h2>No Record</h2></div>
                  )
                : (
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                          <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                              <BsCheckCircleFill className='icon'> </BsCheckCircleFill>
                              : <BsCircleFill className='icon'/>
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                          </div>
                          <div>
                            <span><BsFillTrashFill className='icon' /></span>
                          </div>
                        </div>
                    ))
                  )
            }
        </div>
    );
}

export default Home;
