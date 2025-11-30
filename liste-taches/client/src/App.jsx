import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  useEffect(() => {
    // Récupérer les tâches depuis le backend
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
      });
  }, []);
  const handleAddTask = () => {
    if (newTask) {
      // Envoyer la nouvelle tâche au backend
      axios.post('http://localhost:5000/tasks', { title: newTask })
        .then((response) => {
          // Rafraîchir la liste des tâches depuis le serveur
          return axios.get('http://localhost:5000/tasks');
        })
        .then((response) => {
          setTasks(response.data);
          setNewTask('');
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de la tâche:', error);
        });
    }
  };
  return (
    <div>
      <h1>Liste des tâches</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <button onClick={handleAddTask}>Ajouter</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
