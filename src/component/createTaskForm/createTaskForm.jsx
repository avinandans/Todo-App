import { useState } from "react";
import { Modal } from "react-bootstrap";

const CreateTaskForm = ({todoID, dispatch}) => {
    const users = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://randomuser.me/api/portraits/men/25.jpg"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        image: "https://randomuser.me/api/portraits/women/94.jpg"
      },
      {
        id: 3,
        name: "Sam Johnson",
        email: "sam.johnson@example.com",
        image: "https://randomuser.me/api/portraits/men/17.jpg"
      },
      {
        id: 4,
        name: "Emily Brown",
        email: "emily.brown@example.com",
        image: "https://randomuser.me/api/portraits/women/94.jpg"
      },
      {
        id: 5,
        name: "Michael Williams",
        email: "michael.williams@example.com",
        image: "https://randomuser.me/api/portraits/men/25.jpg"
      },
      {
        id: 6,
        name: "Laura Davis",
        email: "laura.davis@example.com",
        image: "https://randomuser.me/api/portraits/women/95.jpg"
      },
      {
        id: 7,
        name: "James Brown",
        email: "james.brown@example.com",
        image: "https://randomuser.me/api/portraits/men/26.jpg"
      },
      {
        id: 8,
        name: "Anna Wilson",
        email: "anna.wilson@example.com",
        image: "https://randomuser.me/api/portraits/women/96.jpg"
      },
      {
        id: 9,
        name: "David Clark",
        email: "david.clark@example.com",
        image: "https://randomuser.me/api/portraits/men/18.jpg"
      },
      {
        id: 10,
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        image: "https://randomuser.me/api/portraits/women/97.jpg"
      }
    ];
    const [userOpen, setUserOpen] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [newTaskState, setNewTaskState] = useState({
      title      : '',
      description: '',
      users      : []
    });
    const taskInputHandle = (event) => {
      setNewTaskState({
        ...newTaskState,
        [event.target.name]: event.target.value,
      })
    }  
    const modalHandler = () => {
      setModalState(!modalState)
    }
    const createTask = () => {
      if(newTaskState?.title?.length > 0){
        dispatch({
          type: 'CREATE_TASK',
          payload: {
            todoID : todoID,
            newTask: {taskID: window.crypto.randomUUID(), ...newTaskState }
          }
        })
        setModalState(!modalState)
        setNewTaskState({
          title: '',
          description: ''
        })
      }
    }
    const selectUser = (todoID, user) => {
      setNewTaskState({
        ...newTaskState,
        users: [
          ...newTaskState.users,
          user
        ]
      })
    }
    
    return(
      <>
        <button type="button" className="btn btn-primary btn-add-card w-100" onClick={modalHandler}>Add Task</button>
        <Modal show={modalState} onHide={modalHandler} centered dialogClassName="modal_320px">
          <form id="add-to-list-form" className='p-3' style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"}}>
            <h6 className='fw-bold fs_md'>Create Task</h6 >
            <div className="form-group mb-1">
              <label htmlFor="card-title" className='form-label'>Title</label>
              <input type="text" name='title' className="form-control" placeholder="Enter title" required value={newTaskState?.title} onChange={taskInputHandle}  />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="card-description" className='form-label'>Description</label>
              <textarea className="form-control" name="description" rows="3" placeholder="Enter description" value={newTaskState?.description} onChange={taskInputHandle} ></textarea>
            </div>
            <div className={userOpen ? 'assignToUser mb-2' : 'assignToUser mb-3'} onClick={() => setUserOpen(!userOpen)}>
              <span>+</span> Assign to users {newTaskState.users && newTaskState.users.length}
            </div>
            {
              userOpen && users.length > 0 && (
                <div className='userList mb-3'>
                  {
                    users.map((user, i)=>{
                      return(
                        <div className={newTaskState.users && newTaskState.users.some(obj => obj.id === user.id) ? 'userListItem text-primary' : 'userListItem'} key={i} onClick={() => selectUser(todoID, user)}>
                          <img src={user.image} alt="" />
                          <span>{user.name}</span>
                        </div>
                      )
                    })
                  }              
                </div>
              )
            }
            <button type="button" className="btn btn-primary btn-add-card w-100" onClick={createTask}>Add Task</button>
          </form>
        </Modal>
      </>
    )
}

export default CreateTaskForm;