import { IImageRepository } from 'src/repositories/image/IImageRepository';
import ImageService from 'src/services/ImageService';
import { ImageDTO } from 'src/types/ImageDTO';

describe('ImageService', () => {
  let imageRepository: jest.Mocked<IImageRepository>;
  let imageService: ImageService;

  beforeEach(() => {
    imageRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    imageService = new ImageService(imageRepository);
  });

  describe('getAll', () => {
    it('should return all images', async () => {
      const mockImages = [{ id: 1, imageName: 'image1', imagePath: 'path1' }];
      imageRepository.getAll.mockResolvedValueOnce(mockImages);

      const result = await imageService.getAll();

      expect(imageRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockImages);
    });

    it('should throw an error if fetching all images fails', async () => {
      imageRepository.getAll.mockRejectedValueOnce(new Error('DB Error'));
      await expect(imageService.getAll()).rejects.toThrow('Could not fetch images.');
      expect(imageRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return the image by ID', async () => {
      const mockImage = { id: 1, imageName: 'image1', imagePath: 'path1' };
      imageRepository.getById.mockResolvedValueOnce(mockImage);

      const result = await imageService.getById(1);

      expect(imageRepository.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockImage);
    });

    it('should throw an error if fetching image by ID fails', async () => {
      imageRepository.getById.mockRejectedValueOnce(new Error('DB Error'));

      await expect(imageService.getById(1)).rejects.toThrow('Could not fetch image with id 1.');
      expect(imageRepository.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new image', async () => {
      const mockImage: ImageDTO = { name: 'image1', path: 'path1' };
      imageRepository.create.mockResolvedValueOnce(1);

      const result = await imageService.create(mockImage);

      expect(imageRepository.create).toHaveBeenCalledWith(mockImage);
      expect(result).toBe(1);
    });

    it('should throw an error if creating an image fails', async () => {
      const mockImage: ImageDTO = { name: 'image1', path: 'path1' };
      imageRepository.create.mockRejectedValueOnce(new Error('DB Error'));

      await expect(imageService.create(mockImage)).rejects.toThrow('Could not create image.');
      expect(imageRepository.create).toHaveBeenCalledWith(mockImage);
    });
  });

  describe('update', () => {
    it('should update an image', async () => {
      const mockImage: ImageDTO = { id: 1, name: 'image1', path: 'path1' };
      imageRepository.update.mockResolvedValueOnce(1);

      const result = await imageService.update(mockImage);

      expect(imageRepository.update).toHaveBeenCalledWith(mockImage);
      expect(result).toBe(1);
    });

    it('should throw an error if updating an image fails', async () => {
      const mockImage: ImageDTO = { id: 1, name: 'image1', path: 'path1' };
      imageRepository.update.mockRejectedValueOnce(new Error('DB Error'));

      await expect(imageService.update(mockImage)).rejects.toThrow('Could not update image with id 1.');
      expect(imageRepository.update).toHaveBeenCalledWith(mockImage);
    });
  });

  describe('delete', () => {
    it('should delete an image by ID', async () => {
      imageRepository.delete.mockResolvedValueOnce(1);

      const result = await imageService.delete(1);

      expect(imageRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(1);
    });

    it('should throw an error if deleting an image fails', async () => {
      imageRepository.delete.mockRejectedValueOnce(new Error('DB Error'));

      await expect(imageService.delete(1)).rejects.toThrow('Could not delete image with id 1.');
      expect(imageRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
