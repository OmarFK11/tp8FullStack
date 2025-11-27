const express = require('express');
const cors = require('cors');
const app = express();
// Permet les requêtes venant de n'importe quel domaine
app.use(cors());
// Si tu veux restreindre les origines autorisées :
// app.use(cors({ origin: 'http://localhost:3000' }));
// Configurer express pour gérer les requêtes JSON
app.use(express.json());
// Exemple de route
app.get('/api/tasks',
	(req, res) => {
		res.json([{ id: 1, title: 'Faire les courses' },
		{ id: 2, title: 'Apprendre React' }]);
	}
);
app.listen(5000, () => {
	console.log('Server running on http://localhost:5000');
});
