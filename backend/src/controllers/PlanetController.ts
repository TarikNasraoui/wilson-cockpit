import { Request, Response } from 'express';
import PlanetService from '../services/PlanetService';

class PlanetController {
  constructor(private planetService: PlanetService) {
    this.planetService = planetService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.query as { name: string | undefined };
      const planets = await this.planetService.getAll(name);
      res.status(200).json(planets);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const planet = await this.planetService.getById(Number(id));
      if (!planet) {
        res.status(404).json({ error: 'Planet not found' });
      }
      res.status(200).json(planet);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { name, isHabitable, description, imageId } = req.body;
    try {
      const id = await this.planetService.create({ name, isHabitable, description, imageId });
      res.status(201).json({
        id,
        name,
        isHabitable,
        imageId,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, isHabitable, description, imageId } = req.body;
    try {
      const updatedRows = await this.planetService.update({ id: Number(id), name, isHabitable, description, imageId });
      if (updatedRows && updatedRows > 0) {
        res.status(200).json({ message: 'Planet updated successfully' });
      } else {
        res.status(404).json({ error: 'Planet not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await this.planetService.delete(Number(id));
      if (deletedRows && deletedRows > 0) {
        res.status(200).json({ message: 'Planet deleted successfully' });
      } else {
        res.status(404).json({ error: 'Planet not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default PlanetController;
