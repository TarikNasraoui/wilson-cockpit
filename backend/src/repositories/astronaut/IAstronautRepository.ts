import Astronaut from 'src/entities/Astronaut';
import Image from 'src/entities/Image';
import Planet from 'src/entities/Planet';
import { AstronautDTO } from 'src/types/AstronautDTO';
import { RetunedAstronaut } from 'src/types/RetunedAstronaut';

export interface IAstronautRepository {
  getAll(): Promise<RetunedAstronaut[]>;
  getById(id: number): Promise<RetunedAstronaut>;
  create(astronaut: AstronautDTO): Promise<number>;
  update(astronaut: AstronautDTO): Promise<number>;
  delete(id: number): Promise<number>;
}
