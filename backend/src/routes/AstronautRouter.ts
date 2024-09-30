import express from 'express';

import AstronautService from '../services/AstronautService';
import AstronautRepository from '../repositories/astronaut/AstronautRepository';
import AstronautController from '../controllers/AstronautController';

const router = express.Router();

const astronautService = new AstronautService(AstronautRepository);
const astronautController = new AstronautController(astronautService);

router.get('/', astronautController.getAll);
router.get('/:id', astronautController.getById);
router.post('/', astronautController.create);
router.put('/:id', astronautController.update);
router.delete('/:id', astronautController.delete);

export default router;
