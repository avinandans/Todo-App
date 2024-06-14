import logo from './logo.svg';
import './App.css';
import { useReducer, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CreateTaskForm } from './component/components';


function App() {
  const [modalState, setModalState] = useState(false);
  const initTodoState = []
  const [TodoList, dispatch] = useReducer((state, action)=>{
    switch(action.type){
      case 'CREATE_COLUMN':
        return [...state, action.payload];
      case 'DELETE_COLUMN':
        return state.filter((elem)=>{
          return elem.todoID !== action.payload.todoID
        });
      case 'CREATE_TASK':
        return state.map((todoItem)=>{          
          if(todoItem.todoID === action.payload.todoID){  
            return({
              ...todoItem,
              tasks : [
                ...todoItem.tasks,
                action.payload.newTask
              ]
            })
          } 
          return todoItem
        });
      case 'REMOVE_TASK':
        return state.map((todoItem)=>{   
          if(todoItem.todoID === action.payload.todoID){ 
            return {
              ...todoItem,
              tasks : todoItem.tasks.filter(task => task.taskID !== action.payload.taskID)
            }
          }
          return todoItem
        });
    }
  }, initTodoState)

  const [newColumnState, setNewColumnState] = useState({});
  const columnInputHandle = (event) => {
    setNewColumnState({
      ...newColumnState,
      [event.target.name]: event.target.value,
      users: []
    })
  }  
  const modalHandler = () => {
    setModalState(!modalState)
  }
  const DeleteColumnHandler = (todoID) => {
    dispatch({
      type: 'DELETE_COLUMN',
      payload: {
        todoID : todoID
      }
    })
  }
  const DeleteTaskHandler = (todoID, taskID, taskIndex) => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: {
        todoID : todoID,
        taskID: taskID
      }
    })
  }
  const CreateColumnHandler = () => {
    if(newColumnState.title.length > 0){
      dispatch({
        type: 'CREATE_COLUMN',
        payload: {
          todoID: window.crypto.randomUUID(),
          title : newColumnState.title,
          tasks : []
        }
      })
      setNewColumnState({})
      setModalState(!modalState)
    }
  }
  
  return (
    <>
      <div className='todoApp'>
        <div className="container mt-4">
          <div className="row gy-4">
            {
              TodoList.map((elem, i) => {
                return(
                  <div className="col-md-3" key={elem.todoID}>
                    <div className="column">
                      <button className="circle-delete-btn" onClick={()=>DeleteColumnHandler(elem.todoID)}>
                        <i className="fas fa-times"></i>
                      </button>
                      <div className="column-header">{elem.title}</div>
                      {
                        elem.tasks.length ? (
                          elem.tasks.map((task, index)=>{
                            return (
                              <div className="card mb-3" key={index}>
                                <div className="card-body">
                                  <div className="card-labels">
                                    <span className="badge bg-danger me-1"></span>
                                    <span className="badge bg-info"></span>
                                  </div>
                                  <div className="card-title fw-bold">{task.title}</div>
                                  <div className="card-content mt-2">
                                    <div className="card-icons">
                                      <span className="icon me-3"><i className="far fa-comments"></i> 5</span>
                                      <span className="icon"><i className="fas fa-paperclip"></i> 3</span>
                                    </div>
                                    <button className="circle-delete-btn" onClick={()=>DeleteTaskHandler(elem.todoID, task.taskID)}>
                                      <i className="fas fa-times"></i>
                                    </button>
                                    <div className="card-members mt-2">
                                      {
                                        task.users.map((elem, i)=>{
                                          return(
                                            <img src={elem.image} className="rounded-circle member" alt={elem.name} key={i} />
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        ) : <p>Add Task</p>
                      }                                       
                      <CreateTaskForm todoID={elem.todoID} dispatch={dispatch}/>
                    </div>
                  </div>
                )
              })
            }
            <div className="col-md-3">
              <div className="column">
                <button type="button" className="btn btn-primary btn-add-card w-100" onClick={() => setModalState(true)}>Add Column</button>
                <Modal show={modalState} onHide={modalHandler} centered dialogClassName="modal_320px">
                  <form id="add-to-list-form" className='p-3' style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"}}>
                    <h6 className='fw-bold fs_md'>Add Column</h6 >
                    <div className="form-group mb-1">
                      <label htmlFor="card-title" className='form-label'>Title</label>
                      <input type="text" name='title' className="form-control" placeholder="Enter title" required value={newColumnState?.title} onChange={columnInputHandle}  />
                    </div>
                    <button type="button" className="btn btn-primary btn-add-card w-100 mt-3" onClick={CreateColumnHandler}>Add Column</button>
                  </form>
                </Modal>
              </div>                    
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
