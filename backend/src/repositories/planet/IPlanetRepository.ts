import { PlanetDTO } from 'src/types/PlanetDTO';
import { ReturnedPlanet } from 'src/types/ReturnedPlanet';

export interface IPlanetRepository {
  getAll(filterName?: string): Promise<Array<ReturnedPlanet>>;
  getById(id: number): Promise<ReturnedPlanet>;
  create(planet: PlanetDTO): Promise<number>;
  update(planet: PlanetDTO): Promise<number>;
  delete(id: number): Promise<number>;
}
