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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  deleteTask,
  toggleComplete,
  addTask,
  updatePriority,
  updateTask,
  reorderTasks,
} from '../features/tasks/taskSlice';
import DeleteConfirmationModal from './DeleteConfirmationModal';

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
  });

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for sorting
  const [sortOption, setSortOption] = useState('default');

  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
    if (!newTask.title || !newTask.dueDate) return;

    dispatch(addTask({ ...newTask, id: Date.now(), completed: false }));
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  // Handle task editing
  const [editingTask, setEditingTask] = useState(null);
  const handleEdit = (task) => {
    setEditingTask({ ...task });
  };
  const handleSaveEdit = () => {
    dispatch(updateTask(editingTask));
    setEditingTask(null);
  };

  const handlePriorityChange = (taskId, priority) => {
    dispatch(updatePriority({ id: taskId, priority }));
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list or in the same position
    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    // Dispatch reorder action
    dispatch(
      reorderTasks({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  // New handler for deleting a task
  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div>
      <h2>Task Dashboard</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilter('all')} style={{ marginRight: '10px' }}>
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ marginRight: '10px' }}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          style={{ marginRight: '10px' }}
        >
          Pending
        </button>
        <button onClick={() => setFilter('overdue')}>Overdue</button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div style={{ marginBottom: '20px' }}>
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
      <div style={{ marginBottom: '20px' }}>
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
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Edit Task Form */}
      {editingTask && (
        <div className="edit-form">
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          />
          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) =>
              setEditingTask({ ...editingTask, dueDate: e.target.value })
            }
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      )}

      {/* Task List with Drag and Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sortedTasks.length === 0 ? (
                <p>No tasks to show for the selected filter.</p>
              ) : (
                sortedTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          marginBottom: '10px',
                          backgroundColor:
                            new Date(task.dueDate) < new Date() &&
                            !task.completed
                              ? '#f8d7da'
                              : 'white',
                        }}
                        className="task-card"
                      >
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                        <button
                          onClick={() => dispatch(toggleComplete(task.id))}
                        >
                          {task.completed
                            ? 'Mark as Pending'
                            : 'Mark as Completed'}
                        </button>
                        {/* Priority Dropdown */}
                        <div>
                          <label>Priority: </label>
                          <select
                            value={task.priority || 'Medium'}
                            onChange={(e) =>
                              handlePriorityChange(task.id, e.target.value)
                            }
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                        <button onClick={() => handleDeleteTask(task)}>
                          Delete
                        </button>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Delete Confirmation Modal */}
      {/* Delete Confirmation Modal */}
<DeleteConfirmationModal
  isOpen={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={confirmDeleteTask}
  task={taskToDelete}
/>
</div>

        )}

        export default TaskList;

