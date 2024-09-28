import express from 'express';
import PlanetController from '../controllers/PlanetController';

const router = express.Router();

router.get('/allPlanets', PlanetController.getAll);
router.get('/:id', PlanetController.getById);
router.post('/create', PlanetController.create);
router.put('/update/:id', PlanetController.update);
router.delete('/delete/:id', PlanetController.delete);

export default router;
