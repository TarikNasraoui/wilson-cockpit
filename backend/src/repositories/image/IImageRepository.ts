import Image from 'src/entities/Image';
import { ImageDTO } from 'src/types/ImageDTO';

export interface IImageRepository {
  getAll(): Promise<Image[]>;
  getById(id: number): Promise<Image | null>;
  create(image: ImageDTO): Promise<number>;
  update(image: ImageDTO): Promise<number>;
  delete(id: number): Promise<number>;
}
