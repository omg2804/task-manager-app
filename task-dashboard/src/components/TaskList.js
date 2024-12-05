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

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title) {
      alert('Task title is required');
      return;
    }
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({ title: '', description: '' });
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-list-container">
      <h2>Task Dashboard</h2>

      {/* Add New Task */}
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
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
