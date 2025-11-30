const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoApp';

// Middlewares
app.use(cors());
app.use(express.json()); // pour analyser le corps des requêtes JSON

// Connexion à la base de données MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => console.log('Connecté à la base de données MongoDB'))
	.catch((err) => console.log('Erreur de connexion à MongoDB:', err));

// Créer une route pour récupérer les tâches
app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
	}
});

// Créer une route pour ajouter une tâche
app.post('/tasks', async (req, res) => {
	try {
		const { title } = req.body;
		if (!title) {
			return res.status(400).json({ error: 'Le titre de la tâche est requis' });
		}
		const newTask = new Task({ title, completed: false });
		const savedTask = await newTask.save();
		res.status(201).json(savedTask);
	} catch (error) {
		res.status(500).json({ error: 'Erreur lors de l\'ajout de la tâche' });
	}
});

app.listen(PORT, () => {
	console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
