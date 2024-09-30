import Astronaut from 'src/entities/Astronaut';
import { IAstronautRepository } from 'src/repositories/astronaut/IAstronautRepository';
import { AstronautDTO } from 'src/types/AstronautDTO';
import { RetunedAstronaut } from 'src/types/RetunedAstronaut';

class AstronautService {
  constructor(private astronautRepository: IAstronautRepository) {
    this.astronautRepository = astronautRepository;
  }

  async getAll(): Promise<Astronaut[]> {
    try {
      const astronauts = await this.astronautRepository.getAll();
      return astronauts.map((astronaut: RetunedAstronaut) => ({
        id: astronaut.id,
        firstname: astronaut.firstname,
        lastname: astronaut.lastname,
        originPlanet: {
          id: astronaut.id,
          name: astronaut.name,
          isHabitable: !!astronaut.isHabitable,
          description: astronaut.description,
          image: {
            path: astronaut.imagePath,
            name: astronaut.imageName,
          },
        },
      }));
    } catch (error) {
      throw new Error('Could not fetch astronauts.');
    }
  }

  async getById(id: number): Promise<Astronaut | null> {
    try {
      const astronaut = await this.astronautRepository.getById(id);
      if (!astronaut) {
        return null;
      }
      return {
        id: astronaut.id,
        firstname: astronaut.firstname,
        lastname: astronaut.lastname,
        originPlanet: {
          id: astronaut.id,
          name: astronaut.name,
          isHabitable: !!astronaut.isHabitable,
          description: astronaut.description,
          image: {
            path: astronaut.imagePath,
            name: astronaut.imageName,
          },
        },
      };
    } catch (error) {
      throw new Error(`Could not fetch astronaut with id ${id}.`);
    }
  }

  async create(astronaut: AstronautDTO): Promise<number> {
    try {
      const { firstname, lastname, originPlanetId } = astronaut;
      return await this.astronautRepository.create({ firstname, lastname, originPlanetId });
    } catch (error) {
      throw new Error('Could not create astronaut.');
    }
  }

  async update(astronaut: AstronautDTO): Promise<number | void> {
    try {
      const { id, firstname, lastname, originPlanetId } = astronaut;
      if (id) {
        return await this.astronautRepository.update({ id, firstname, lastname, originPlanetId });
      }
      throw new Error('Astronaut ID is required for update.');
    } catch (error) {
      throw new Error(`Could not update astronaut with id ${astronaut.id}.`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      return await this.astronautRepository.delete(id);
    } catch (error) {
      throw new Error(`Could not delete astronaut with id ${id}.`);
    }
  }
}

export default AstronautService;
