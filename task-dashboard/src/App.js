import React from 'react';
import TaskList from './components/TaskList';

function App() {
  return (
    <div>
      <h1>Welcome to My Task Dashboard</h1>
      <p>This is your customized React application.</p>
      
      
      {/* Render TaskList Component */}
      <TaskList />
    </div>
  );
}



export default App;
