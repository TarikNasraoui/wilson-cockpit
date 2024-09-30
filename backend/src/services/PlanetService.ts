import { PlanetDTO } from 'src/types/PlanetDTO';
import { IPlanetRepository } from '../repositories/planet/IPlanetRepository';
import Planet from 'src/entities/Planet';
import Astronaut from 'src/entities/Astronaut';
import { ReturnedPlanet } from 'src/types/ReturnedPlanet';

class PlanetService {
  constructor(private planetRepository: IPlanetRepository) {
    this.planetRepository = planetRepository;
  }

  async getAll(filterName?: string): Promise<Array<Planet>> {
    try {
      const planets = await this.planetRepository.getAll(filterName);
      const mappedPlanets = planets.map((planet: ReturnedPlanet) => ({
        id: planet.id,
        name: planet.name,
        isHabitable: !!planet.isHabitable,
        description: planet.description,
        image: {
          id: planet.imageId,
          imagePath: planet.imagePath,
          imageName: planet.imageName,
        },
        astronauts: planet.astronauts
          ? this.parseAstronauts(planet.astronauts).map(
              (astronaut: any): Astronaut => ({
                id: astronaut.id,
                firstname: astronaut.firstname,
                lastname: astronaut.lastname,
              })
            )
          : [],
      }));
      return mappedPlanets;
    } catch (error) {
      throw new Error('Could not fetch planets.');
    }
  }

  async getById(id: number): Promise<Planet | null> {
    try {
      const planet = await this.planetRepository.getById(id);

      if (!planet) return null;

      return {
        id: planet.id,
        name: planet.name,
        isHabitable: !!planet.isHabitable,
        description: planet.description,
        image: {
          id: planet.imageId,
          imagePath: planet.imagePath,
          imageName: planet.imageName,
        },
        astronauts: planet.astronauts
          ? this.parseAstronauts(planet.astronauts).map(
              (astronaut: any): Astronaut => ({
                id: astronaut.id,
                firstname: astronaut.firstname,
                lastname: astronaut.lastname,
              })
            )
          : [],
      };
    } catch (error) {
      throw new Error('Could not fetch planet.');
    }
  }

  async create(planet: PlanetDTO): Promise<number> {
    const { name, isHabitable, description, imageId } = planet;
    try {
      return await this.planetRepository.create({ name, isHabitable, description, imageId });
    } catch (error) {
      throw new Error('Could not create planet.');
    }
  }

  async update(planet: PlanetDTO): Promise<number | undefined> {
    const { id, name, isHabitable, description, imageId } = planet;
    if (!id) throw new Error('Planet ID is required for update.');
    try {
      return await this.planetRepository.update({ id, name, isHabitable, description, imageId });
    } catch (error) {
      throw new Error('Could not update planet.');
    }
  }

  async delete(id: number): Promise<number> {
    try {
      return await this.planetRepository.delete(id);
    } catch (error) {
      throw new Error('Could not delete planet.');
    }
  }

  private parseAstronauts(astronauts: string | null | Astronaut[] | undefined) {
    if (!astronauts) return [];
    if (Array.isArray(astronauts)) {
      return astronauts;
    }
    try {
      return JSON.parse(`[${astronauts}]`);
    } catch (error) {
      return [];
    }
  }
}

export default PlanetService;
