import { Request, Response } from 'express';
import AstronautService from 'src/services/AstronautService';

class AstronautController {
  constructor(private astronautService: AstronautService) {
    this.astronautService = astronautService;
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const astronauts = await this.astronautService.getAll();
      res.status(200).json(astronauts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'Invalid astronaut ID' });
    }
    try {
      const astronaut = await this.astronautService.getById(Number(id));
      if (!astronaut) {
        res.status(404).json({ error: 'Astronaut not found' });
      }
      res.status(200).json(astronaut);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, originPlanetId } = req.body;
    if (!firstname || !lastname || !originPlanetId) {
      res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const id = await this.astronautService.create({ firstname, lastname, originPlanetId });
      res.status(201).json({ id, firstname, lastname, originPlanetId });
    } catch (error) {
      console.error('Error creating astronaut:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const updatedRows = await this.astronautService.update({
        id: Number(id),
        firstname,
        lastname,
        originPlanetId,
      });
      if (updatedRows && updatedRows > 0) {
        res.status(200).json({ message: 'Astronaut updated successfully' });
      } else {
        res.status(404).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'Invalid astronaut ID' });
    }

    try {
      const deletedRows = await this.astronautService.delete(Number(id));
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Astronaut deleted successfully' });
      } else {
        res.status(404).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default AstronautController;
