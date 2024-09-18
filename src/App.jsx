import { useEffect, useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';


function App() {
  const [iscompelte,setiscomplete]=useState(false);
  const [alltodo,setTodo]=useState([]);
  const [newTitle,setNewTitle]=useState('');
  const [newDescription,setNewDescription]=useState('');
  const [completedTodo,setCompletedTodo]=useState([]);
  

 const handleAddTodo=()=>{
  let newTodoItem={
    title:newTitle,
    description:newDescription
  }

  let updatedTodoArr=[...alltodo]
  updatedTodoArr.push(newTodoItem);
  setTodo(updatedTodoArr);
  localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
 }

 const handleDelete=(index)=>{
  let reduceTodo=[...alltodo];
  reduceTodo.splice(index,1);

  localStorage.setItem('todolist',JSON.stringify(reduceTodo));
  setTodo(reduceTodo)
  
 }

 const handleComplete=(index)=>{
  let now=new Date();
  let dd=now.getDate();
  let mm=now.getMonth();
  let yyyy=now.getFullYear();
  let h=now.getHours();
  let m=now.getMinutes();
  let s=now.getSeconds();
  let completedOn=dd+'-'+ mm +'-' +yyyy + ' at ' + h+':'+m+':'+s;
  
  let filteredItem={
    ...alltodo[index],
    completedOn:completedOn,
  };
  let updatedCompletedArr = [...completedTodo];
  updatedCompletedArr.push (filteredItem);
  setCompletedTodo (updatedCompletedArr);
  handleDelete(index);
  localStorage.setItem (
    'completedTodo',
    JSON.stringify (updatedCompletedArr)
  );
};
  const handleCompeltedDelete=index=>{
    let reduceTodo=[...completedTodo];
  reduceTodo.splice(index);

  localStorage.setItem('completedTodo',JSON.stringify(reduceTodo));
  setCompletedTodo(reduceTodo);

 }
 useEffect(()=>{
let savedtodo=JSON.parse(localStorage.getItem('todolist'))
let savedcompletedTodo=JSON.parse(localStorage.getItem('completedTodo'))

if(savedtodo){
  setTodo(savedtodo)
}
if(savedcompletedTodo){
  setCompletedTodo(savedcompletedTodo)
}
 },[]);

  return (
    <>
    <div className='myapp'>
      <h1>ToDO List</h1>
      <div className='todo-warpper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Tittle</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='what the task title'/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='what the task description'/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-func'>
          <button className={`secorndaryBtn ${iscompelte===false && 'ative'}`} onClick={()=>setiscomplete(false)}>Todo</button>
          <button className={`secorndaryBtn ${iscompelte===true && 'ative'}`} onClick={()=>setiscomplete(true)}>completed </button>
        </div>
        <div className='todo-list'>
          {iscompelte===false &&  alltodo.map((item,index)=>{
            return(
              <div className='todo-list-item'key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
          <AiOutlineDelete className='icon'onClick={()=>handleDelete(index)} title='Delete?' />
          <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete?' />
         </div>
          </div>
            )
          })}

{iscompelte===true &&  completedTodo.map((item,index)=>{
            return(
              <div className='todo-list-item'key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Compelte On:{item.completedOn}</small></p>
            <div>
          <AiOutlineDelete className='icon'onClick={()=>handleCompeltedDelete(index)} title='Delete?' />
         </div>
          </div>
            )
          })}
         
        </div>
      </div>
    </div>

        
    </>
  )
}

export default App