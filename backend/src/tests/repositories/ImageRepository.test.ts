import { ImageDTO } from 'src/types/ImageDTO';
import knex from '../../db';
import ImageRepository from 'src/repositories/image/ImageRepository';

jest.mock('../../db');

describe('ImageRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ImageRepository.getAll', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch all images', async () => {
      const mockImages = [
        { id: 1, name: 'image1', path: 'path1' },
        { id: 2, name: 'image2', path: 'path2' },
      ];

      const mockKnex = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValueOnce(mockImages),
      });

      (knex as unknown) = mockKnex;

      const result = await ImageRepository.getAll();
      expect(mockKnex).toHaveBeenCalledWith('images');
      expect(mockKnex().select).toHaveBeenCalledWith('*');
      expect(result).toEqual(mockImages);
    });

    it('should throw an error if fetching images fails', async () => {
      const mockKnex = jest.fn().mockReturnValue({
        select: jest.fn().mockRejectedValueOnce(new Error('DB Error')),
      });

      (knex as unknown) = mockKnex;

      await expect(ImageRepository.getAll()).rejects.toThrow('Could not fetch images.');
    });
  });

  describe('getById', () => {
    it('should fetch an image by ID', async () => {
      const mockImage = { id: 1, name: 'image1', path: 'path1' };

      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockResolvedValueOnce(mockImage);
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        first: mockFirst,
      } as any);

      const result = await ImageRepository.getById(1);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', 1);
      expect(mockFirst).toHaveBeenCalled();
      expect(result).toEqual(mockImage);
    });

    it('should throw an error if fetching image fails', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockRejectedValueOnce(new Error('DB Error'));
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        first: mockFirst,
      } as any);

      await expect(ImageRepository.getById(1)).rejects.toThrow('Could not fetch image with id 1.');
    });
  });

  describe('getById', () => {
    it('should fetch an image by ID', async () => {
      const mockImage = { id: 1, name: 'image1', path: 'path1' };

      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockResolvedValueOnce(mockImage);
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        first: mockFirst,
      } as any);

      const result = await ImageRepository.getById(1);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', 1);
      expect(mockFirst).toHaveBeenCalled();
      expect(result).toEqual(mockImage);
    });

    it('should throw an error if fetching image fails', async () => {
      const mockWhere = jest.fn().mockReturnThis();
      const mockFirst = jest.fn().mockRejectedValueOnce(new Error('DB Error'));
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        first: mockFirst,
      } as any);

      await expect(ImageRepository.getById(1)).rejects.toThrow('Could not fetch image with id 1.');
    });
  });

  describe('create', () => {
    it('should create a new image and return its ID', async () => {
      const mockImage: ImageDTO = { name: 'image1', path: 'path1' };
      const mockInsertedId = [1];

      const mockInsert = jest.fn().mockReturnThis();
      const mockReturning = jest.fn().mockResolvedValueOnce(mockInsertedId);
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        insert: mockInsert,
        returning: mockReturning,
      } as any);

      const result = await ImageRepository.create(mockImage);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockInsert).toHaveBeenCalledWith({ name: mockImage.name, path: mockImage.path });
      expect(mockReturning).toHaveBeenCalledWith('id');

      expect(result).toBe(mockInsertedId[0]);
    });

    it('should throw an error if creating an image fails', async () => {
      const mockImage: ImageDTO = { name: 'image1', path: 'path1' };

      const mockInsert = jest.fn().mockReturnThis();
      const mockReturning = jest.fn().mockRejectedValueOnce(new Error('DB Error'));
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        insert: mockInsert,
        returning: mockReturning,
      } as any);

      await expect(ImageRepository.create(mockImage)).rejects.toThrow('Could not create image.');
    });
  });

  describe('update', () => {
    it('should update an image and return the number of rows affected', async () => {
      const mockImage: ImageDTO = { id: 1, name: 'updatedImage', path: 'updatedPath' };
      const mockRowsAffected = 1;

      const mockWhere = jest.fn().mockReturnThis();
      const mockUpdate = jest.fn().mockResolvedValueOnce(mockRowsAffected);
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        update: mockUpdate,
      } as any);

      const result = await ImageRepository.update(mockImage);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', mockImage.id);
      expect(mockUpdate).toHaveBeenCalledWith({ name: mockImage.name, path: mockImage.path });
      expect(result).toBe(mockRowsAffected);
    });

    it('should throw an error if updating image fails', async () => {
      const mockImage: ImageDTO = { id: 1, name: 'updatedImage', path: 'updatedPath' };

      const mockWhere = jest.fn().mockReturnThis();
      const mockUpdate = jest.fn().mockRejectedValueOnce(new Error('DB Error'));
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        update: mockUpdate,
      } as any);

      await expect(ImageRepository.update(mockImage)).rejects.toThrow(`Could not update image with id ${mockImage.id}.`);
    });
  });

  describe('delete', () => {
    it('should delete an image and return the number of rows deleted', async () => {
      const mockId = 1;
      const mockRowsDeleted = 1;

      const mockWhere = jest.fn().mockReturnThis();
      const mockDel = jest.fn().mockResolvedValueOnce(mockRowsDeleted);

      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        del: mockDel,
      } as any);
      const result = await ImageRepository.delete(mockId);

      expect(knex).toHaveBeenCalledWith('images');
      expect(mockWhere).toHaveBeenCalledWith('id', mockId);
      expect(mockDel).toHaveBeenCalled();
      expect(result).toBe(mockRowsDeleted);
    });

    it('should throw an error if deleting image fails', async () => {
      const mockId = 1;
      const mockWhere = jest.fn().mockReturnThis();
      const mockDel = jest.fn().mockRejectedValueOnce(new Error('DB Error'));
      (knex as jest.MockedFunction<typeof knex>).mockReturnValue({
        where: mockWhere,
        del: mockDel,
      } as any);

      await expect(ImageRepository.delete(mockId)).rejects.toThrow(`Could not delete image with id ${mockId}.`);
    });
  });
});
