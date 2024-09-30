import express from 'express';

import ImageService from '../services/ImageService';
import ImageController from '../controllers/ImageController';
import ImageRepository from '../repositories/image/ImageRepository';

const router = express.Router();

const imageService = new ImageService(ImageRepository);
const imageController = new ImageController(imageService);

router.get('/', imageController.getAll);
router.get('/:id', imageController.getById);
router.post('/', imageController.create);
router.put('/:id', imageController.update);
router.delete('/:id', imageController.delete);

export default router;
