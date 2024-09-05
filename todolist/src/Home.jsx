import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import todoImage from './images/hell.jpg'

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

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
                            <p>{todo.task}</p> 
                        </div>
                    ))
                  )
            }
        </div>
    );
}

export default Home;
