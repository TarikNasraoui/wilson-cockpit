import Image from 'src/entities/Image';
import { IImageRepository } from 'src/repositories/image/IImageRepository';
import { ImageDTO } from 'src/types/ImageDTO';

class ImageService {
  constructor(private imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async getAll(): Promise<Image[]> {
    try {
      return await this.imageRepository.getAll();
    } catch (error) {
      throw new Error('Could not fetch images.');
    }
  }

  async getById(id: number): Promise<Image | null> {
    try {
      return await this.imageRepository.getById(id);
    } catch (error) {
      throw new Error(`Could not fetch image with id ${id}.`);
    }
  }

  async create(image: ImageDTO): Promise<number> {
    try {
      const { name, path } = image;
      return await this.imageRepository.create({ name, path });
    } catch (error) {
      throw new Error('Could not create image.');
    }
  }

  async update(image: ImageDTO): Promise<number> {
    try {
      const { id, name, path } = image;
      if (id && id < 1) {
        throw new Error('Image ID is required for update.');
      }
      return await this.imageRepository.update({ id, name, path });
    } catch (error) {
      throw new Error(`Could not update image with id ${image.id}.`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      return await this.imageRepository.delete(id);
    } catch (error) {
      throw new Error(`Could not delete image with id ${id}.`);
    }
  }
}

export default ImageService;
