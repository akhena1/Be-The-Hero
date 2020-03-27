const express = require('express');
const SessionController = require('./controllers/SessionController')
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const routes = express.Router();

routes.post('/sessions', SessionController.create )

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);

module.exports = routes;