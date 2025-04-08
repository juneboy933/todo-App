import {useEffect, useState} from 'react'
import './Todo.css'
import { useTheme } from './ThemeProvider';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [editingTodo, setEditngTodo] = useState(null);
  const [newTask, setNewTask] = useState('');

  const {isDarkMode, toggleTheme} = useTheme(); 
  const themeClass = isDarkMode ? 'dark' : 'light';

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos])


  const add = () => {
    if(input.trim() !== ''){
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
        task: input,
      }
      setTodos([...todos, newTodo]);
      setInput('');
    } 
    return;
  }

  const toggle = (id) => {
    setTodos(
      todos.map((todo) => {
        todo.id === id ? {...todo, completed: !todo.completed} : todo;
      })
    )
  };

  const remove = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    // console.log('todo:', todo);
    if(!todo) return false;
    if(filter === 'completed') return todo.completed;
    else if(filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className={`app ${themeClass}`}>
      <button className='theme-toggle-btn' onClick={toggleTheme}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>
      <h1>Todo App</h1>
      <div className="input-section">
      <input 
        type="text"
        value={input}
        placeholder='Add a task..'
        onChange={(e) => setInput(e.target.value)} />      
      <button onClick={add}>Add</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul className='todo-list'>
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggle(todo.id)}>{todo.text}</span>
            <button onClick={() => remove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
    
  )
}

export default Todo
