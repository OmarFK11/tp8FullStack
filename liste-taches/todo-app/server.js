const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.get('/tasks', (req, res) => {
	// Retourner une liste de tâches (à implémenter avec MongoDB)
	res.send([]);
});

// Créer une route pour ajouter une tâche
app.post('/tasks', (req, res) => {
	// Ajouter une tâche à la base de données (à implémenter)
	res.send({ message: 'Tâche ajoutée' });
});

app.listen(PORT, () => {
	console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
