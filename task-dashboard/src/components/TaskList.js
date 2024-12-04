// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteTask, toggleComplete, addTask, updatePriority, updateTask } from '../features/tasks/taskSlice';

// const TaskList = () => {
//   const tasks = useSelector((state) => state.tasks.tasks);
//   const dispatch = useDispatch();

//   // State for filters
//   const [filter, setFilter] = useState('all');
  
//   // State for new task input
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//   });

//   // State for search term
//   const [searchTerm, setSearchTerm] = useState('');

//   // State for sorting
//   const [sortOption, setSortOption] = useState('default');

//   // Filter tasks based on search term and selected filter
//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
    
//     if (!matchesSearch) return false;

//     if (filter === 'completed') return task.completed;
//     if (filter === 'pending') return !task.completed;
//     if (filter === 'overdue') return isOverdue;

//     return true;
//   });

//   // Sort tasks based on the selected option
//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortOption === 'dueDate') {
//       return new Date(a.dueDate) - new Date(b.dueDate);
//     }
//     if (sortOption === 'priority') {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       return priorityOrder[a.priority || 'Medium'] - priorityOrder[b.priority || 'Medium'];
//     }
//     return 0; // Default sorting (no sorting)
//   });

//   // Handle task submission
//   const handleAddTask = () => {
//     if (!newTask.title || !newTask.dueDate) return; // Ensure task title and due date are provided

//     dispatch(addTask({ ...newTask, id: Date.now(), completed: false }));
//     setNewTask({ title: '', description: '', dueDate: '' });
//   };

//   // Handle task editing
//   const [editingTask, setEditingTask] = useState(null);
//   const handleEdit = (task) => {
//     setEditingTask({ ...task });
//   };
//   const handleSaveEdit = () => {
//     dispatch(updateTask(editingTask));
//     setEditingTask(null);
//   };

//   const handlePriorityChange = (taskId, priority) => {
//     dispatch(updatePriority({ id: taskId, priority }));
//   };

//   return (
//     <div>
//       <h2>Task Dashboard</h2>

//       {/* Filter Buttons */}
//       <div style={{ marginBottom: '20px' }}>
//         <button onClick={() => setFilter('all')} style={{ marginRight: '10px' }}>All</button>
//         <button onClick={() => setFilter('completed')} style={{ marginRight: '10px' }}>Completed</button>
//         <button onClick={() => setFilter('pending')} style={{ marginRight: '10px' }}>Pending</button>
//         <button onClick={() => setFilter('overdue')}>Overdue</button>
//       </div>

//       {/* Search Input */}
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Search Tasks"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Sort Dropdown */}
//       <div style={{ marginBottom: '20px' }}>
//         <label>Sort By: </label>
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//         >
//           <option value="default">Default</option>
//           <option value="dueDate">Due Date</option>
//           <option value="priority">Priority</option>
//         </select>
//       </div>

//       {/* Add New Task Form */}
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Task Description"
//           value={newTask.description}
//           onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//         />
//         <input
//           type="date"
//           value={newTask.dueDate}
//           onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//         />
//         <button onClick={handleAddTask}>Add Task</button>
//       </div>

//       {/* Edit Task Form */}
//       {editingTask && (
//         <div className="edit-form">
//           <input
//             type="text"
//             value={editingTask.title}
//             onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
//           />
//           <textarea
//             value={editingTask.description}
//             onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
//           />
//           <input
//             type="date"
//             value={editingTask.dueDate}
//             onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
//           />
//           <button onClick={handleSaveEdit}>Save</button>
//         </div>
//       )}

//       {/* Task List */}
//       <div>
//         {sortedTasks.length === 0 ? (
//           <p>No tasks to show for the selected filter.</p>
//         ) : (
//           sortedTasks.map((task) => (
//             <div
//               key={task.id}
//               className="task-card"
//               style={{
//                 marginBottom: '10px',
//                 backgroundColor: new Date(task.dueDate) < new Date() && !task.completed ? '#f8d7da' : 'white',
//               }}
//             >
//               <h3>{task.title}</h3>
//               <p>{task.description}</p>
//               <p>Due Date: {task.dueDate}</p>
//               <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
//               <button onClick={() => dispatch(toggleComplete(task.id))}>
//                 {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
//               </button>
//               {/* Priority Dropdown */}
//               <div>
//                 <label>Priority: </label>
//                 <select
//                   value={task.priority || 'Medium'}
//                   onChange={(e) => handlePriorityChange(task.id, e.target.value)}
//                 >
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
//               <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
//               <button onClick={() => handleEdit(task)}>Edit</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteTask,
  toggleComplete,
  addTask,
  updateTask,
} from '../features/tasks/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  // State for filters
  const [filter, setFilter] = useState('all');

  // State for new task input
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for sorting
  const [sortOption, setSortOption] = useState('default');

  // State to manage the confirmation modal visibility and the task to delete
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter tasks based on search term and selected filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

    if (!matchesSearch) return false;

    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') return isOverdue;

    return true;
  });

  // Sort tasks based on the selected option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortOption === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority || 'Medium'] - priorityOrder[b.priority || 'Medium'];
    }
    return 0; // Default sorting (no sorting)
  });

  // Handle task submission
  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      alert('Please enter a task title and due date');
      return;
    }

    dispatch(addTask({
      ...newTask,
      id: Date.now(),
      completed: false
    }));
    setNewTask({ title: '', description: '', dueDate: '', priority: 'Medium' });
  };

  // Handle task editing
  const [editingTask, setEditingTask] = useState(null);
  const handleEdit = (task) => {
    setEditingTask({ ...task });
  };
  const handleSaveEdit = () => {
    if (!editingTask.title) {
      alert('Task title cannot be empty');
      return;
    }
    dispatch(updateTask(editingTask));
    setEditingTask(null);
  };

  // Handle delete task (triggering the confirmation modal)
  const handleDeleteTask = (task) => {
    setShowModal(true);
    setTaskToDelete(task);
  };

  // Confirm task deletion
  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id)); // Proceed with deletion
      setShowModal(false); // Close the modal
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowModal(false); // Close the modal without doing anything
  };

  return (
    <div className="task-list-container">
      <h2>Task Dashboard</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active' : ''}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('overdue')}
          className={filter === 'overdue' ? 'active' : ''}
        >
          Overdue
        </button>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="sort-container">
        <label>Sort By: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Add New Task Form */}
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Edit Task Form */}
      {editingTask && (
        <div className="edit-task-form">
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
            placeholder="Task Title"
          />
          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
            placeholder="Task Description"
          />
          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) =>
              setEditingTask({ ...editingTask, dueDate: e.target.value })
            }
          />
          <select
            value={editingTask.priority || 'Medium'}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSaveEdit}>Save Changes</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}

      {/* Task List */}
      <div className="task-list">
        {sortedTasks.length === 0 ? (
          <p>No tasks to show for the selected filter.</p>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${new Date(task.dueDate) < new Date() && !task.completed ? 'overdue' : ''}`}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className="task-priority">{task.priority}</span>
              </div>
              <p>{task.description}</p>
              <div className="task-details">
                <p>Due Date: {task.dueDate}</p>
                <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => dispatch(toggleComplete(task.id))}
                  className="toggle-complete-btn"
                >
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task)} // Trigger delete confirmation
                  className="delete-btn"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
