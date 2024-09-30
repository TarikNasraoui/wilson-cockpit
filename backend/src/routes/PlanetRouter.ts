import express from 'express';
import PlanetController from '../controllers/PlanetController';
import PlanetService from '../services/PlanetService';
import PlanetRepository from '../repositories/planet/PlanetRepository';

const router = express.Router();

const planetService = new PlanetService(PlanetRepository);
const planetController = new PlanetController(planetService);

router.get('/', planetController.getAll);
router.get('/:id', planetController.getById);
router.post('/', planetController.create);
router.put('/:id', planetController.update);
router.delete('/:id', planetController.delete);

export default router;
