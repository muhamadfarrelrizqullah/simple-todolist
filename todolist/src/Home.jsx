import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import todoImage from './images/kenapa.png'
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
      .then(result => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="home">
      <h2>To Do List gae wong Males</h2>
      <img src={todoImage} alt="To-Do List" style={{ width: '200px', marginBottom: '20px' }} />
      <Create />
      {
        todos.length === 0
          ? (
            <div><h2>No Record</h2></div>
          )
          : (
            todos.map(todo => (
              <div className='task' key={todo.id}>
                <div className='checkbox' onClick={() => handleEdit(todo.id)}>
                  {todo.done ?
                    <BsCheckCircleFill className='icon'> </BsCheckCircleFill>
                    : <BsCircleFill className='icon' />
                  }
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                  <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo.id)} /></span>
                </div>
              </div>
            ))
          )
      }
    </div>
  );
}

export default Home;
