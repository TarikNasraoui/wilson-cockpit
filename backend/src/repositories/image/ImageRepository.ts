import Image from 'src/entities/Image';
import knex from '../../db';
import { IImageRepository } from './IImageRepository';
import { ImageDTO } from 'src/types/ImageDTO';

class ImageRepository implements IImageRepository {
  async getAll(): Promise<Array<Image>> {
    try {
      return await knex('images').select('*');
    } catch (error) {
      throw new Error('Could not fetch images.');
    }
  }

  async getById(id: number): Promise<Image> {
    try {
      const image = await knex('images').where('id', id).first();
      return image;
    } catch (error) {
      throw new Error(`Could not fetch image with id ${id}.`);
    }
  }

  async create(image: ImageDTO): Promise<number> {
    try {
      const { name, path } = image;
      const [id] = await knex('images').insert({ name, path }).returning('id'); // Retourne l'ID créé
      return id;
    } catch (error) {
      throw new Error('Could not create image.');
    }
  }

  async update(image: ImageDTO): Promise<number> {
    try {
      const { id, name, path } = image;
      const rowsAffected = await knex('images').where('id', id).update({ name, path });
      return rowsAffected;
    } catch (error) {
      throw new Error(`Could not update image with id ${image.id}.`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const rowsDeleted = await knex('images').where('id', id).del();
      return rowsDeleted;
    } catch (error) {
      throw new Error(`Could not delete image with id ${id}.`);
    }
  }
}

export default new ImageRepository();
