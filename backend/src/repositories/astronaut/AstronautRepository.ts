import { AstronautDTO } from 'src/types/AstronautDTO';
import knex from '../../db';
import { IAstronautRepository } from './IAstronautRepository';
import Astronaut from 'src/entities/Astronaut';
import Planet from 'src/entities/Planet';
import Image from 'src/entities/Image';
import { RetunedAstronaut } from 'src/types/RetunedAstronaut';

class AstronautRepository implements IAstronautRepository {
  async getAll(): Promise<RetunedAstronaut[]> {
    try {
      const astronauts = await knex('astronauts')
        .select(
          'astronauts.id as id',
          'astronauts.firstname',
          'astronauts.lastname',
          'planets.id as planetId',
          'planets.name as name',
          'planets.isHabitable',
          'planets.description',
          'images.id as imageId',
          'images.path as imagePath',
          'images.name as imageName'
        )
        .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
        .join('images', 'images.id', '=', 'planets.imageId');
      return astronauts;
    } catch (error) {
      console.error('Error fetching astronauts:', error);
      throw new Error('Could not fetch astronauts.');
    }
  }

  async getById(id: number): Promise<RetunedAstronaut> {
    try {
      const astronaut = await knex('astronauts')
        .select('astronauts.*', 'planets.*', 'images.path', 'images.name as imageName')
        .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
        .join('images', 'images.id', '=', 'planets.imageId')
        .where('astronauts.id', id)
        .first();
      return astronaut;
    } catch (error) {
      throw new Error('Could not fetch astronaut.');
    }
  }

  async create(astronaut: AstronautDTO): Promise<number> {
    const { firstname, lastname, originPlanetId } = astronaut;
    try {
      const [id] = await knex('astronauts').insert({ firstname, lastname, originPlanetId }).returning('id');
      return id;
    } catch (error) {
      console.error('Error creating astronaut:', error);
      throw new Error('Could not create astronaut.');
    }
  }

  async update(astronaut: AstronautDTO): Promise<number> {
    const { id, firstname, lastname, originPlanetId } = astronaut;
    try {
      return await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
    } catch (error) {
      console.error(`Error updating astronaut with id ${id}:`, error);
      throw new Error('Could not update astronaut.');
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const deletedRows = await knex('astronauts').where('id', id).del();
      return deletedRows;
    } catch (error) {
      console.error(`Error deleting astronaut with id ${id}:`, error);
      throw new Error('Could not delete astronaut.');
    }
  }
}

export default new AstronautRepository();
