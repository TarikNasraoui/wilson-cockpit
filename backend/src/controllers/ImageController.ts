import { Request, Response } from 'express';
import ImageService from 'src/services/ImageService';

class ImageController {
  constructor(private ImageService: ImageService) {
    this.ImageService = ImageService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await this.ImageService.getAll();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const image = await this.ImageService.getById(Number(id));
      if (!image) {
        res.status(404).json({ error: 'Image not found' });
      }
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { name, path } = req.body;
    try {
      const id = await this.ImageService.create({ name, path });
      res.status(201).json({ id, name, path });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, path } = req.body;
    try {
      const updatedRows = await this.ImageService.update({ id: Number(id), name, path });
      if (updatedRows && updatedRows > 0) {
        res.status(200).json({ message: 'Image updated successfully' });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await this.ImageService.delete(Number(id));
      if (deletedRows && deletedRows > 0) {
        res.status(200).json({ message: 'Image deleted successfully' });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default ImageController;
