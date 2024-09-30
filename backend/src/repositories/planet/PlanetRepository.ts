import { PlanetDTO } from 'src/types/PlanetDTO';
import knex from '../../db';
import { IPlanetRepository } from './IPlanetRepository';
import { ReturnedPlanet } from 'src/types/ReturnedPlanet';

class PlanetRepository implements IPlanetRepository {
  async getAll(filterName?: string): Promise<Array<ReturnedPlanet>> {
    try {
      const planets = await knex('planets')
        .select(
          'planets.id',
          'planets.name',
          'planets.isHabitable',
          'planets.description',
          'images.id as imageId',
          'images.path as imagePath',
          'images.name as imageName',
          knex.raw(`
            GROUP_CONCAT(
              JSON_OBJECT(
                'id', astronauts.id,
                'firstname', astronauts.firstname,
                'lastname', astronauts.lastname
              )
            ) as astronauts
          `)
        )
        .join('images', 'images.id', '=', 'planets.imageId')
        .leftJoin('astronauts', 'astronauts.originPlanetId', '=', 'planets.id')
        .where((queryBuilder) => {
          if (filterName) {
            queryBuilder.where('planets.name', 'like', `%${filterName}%`);
          }
        })
        .groupBy('planets.id', 'images.id', 'images.path', 'images.name');
      return planets;
    } catch (error) {
      console.error('Error fetching planets:', error);
      throw new Error('Could not fetch planets');
    }
  }

  async getById(id: number): Promise<ReturnedPlanet> {
    try {
      const planet = await knex('planets')
        .select(
          'planets.*',
          'images.path',
          'images.name as imageName',
          knex.raw(`
          GROUP_CONCAT(
            JSON_OBJECT(
              'id', astronauts.id,
              'firstname', astronauts.firstname,
              'lastname', astronauts.lastname
            )
          ) as astronauts
        `)
        )
        .join('images', 'images.id', '=', 'planets.imageId')
        .leftJoin('astronauts', 'astronauts.originPlanetId', '=', 'planets.id')
        .where('planets.id', id)
        .groupBy('planets.id', 'images.id')
        .first();
      return planet;
    } catch (error) {
      throw new Error('Could not fetch planet');
    }
  }

  async create(planet: PlanetDTO): Promise<number> {
    const { name, isHabitable, description, imageId } = planet;
    try {
      const [id] = await knex('planets').insert({ name, isHabitable, description, imageId }).returning('id');
      return id;
    } catch (error) {
      console.error('Error creating planet:', error);
      throw new Error('Could not create planet');
    }
  }

  async update(planet: PlanetDTO): Promise<number> {
    const { id, name, isHabitable, description, imageId } = planet;
    try {
      const updatedRows = await knex('planets').where('id', id).update({ name, isHabitable, description, imageId });
      return updatedRows;
    } catch (error) {
      throw new Error('Could not update planet');
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const deletedRows = await knex('planets').where('id', id).del();
      return deletedRows;
    } catch (error) {
      throw new Error('Could not delete planet');
    }
  }
}

export default new PlanetRepository();
