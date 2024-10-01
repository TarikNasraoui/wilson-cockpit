import { Request, Response } from 'express';
import PlanetController from 'src/controllers/PlanetController';
import PlanetService from 'src/services/PlanetService';

jest.mock('src/services/PlanetService');

describe('PlanetController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let planetController: PlanetController;
  let planetServiceMock: jest.Mocked<PlanetService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = { query: { name: 'Earth' } };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    planetServiceMock = new PlanetService({} as any) as jest.Mocked<PlanetService>;
    jest.spyOn(planetServiceMock, 'getAll').mockResolvedValue([
      {
        id: 1,
        name: 'Earth',
        isHabitable: true,
        description: 'Our planet',
        image: { id: 1, imagePath: 'earth.jpg', imageName: 'Earth' },
        astronauts: [
          { id: 1, firstname: 'John', lastname: 'Doe' },
          { id: 2, firstname: 'Jane', lastname: 'Smith' },
        ],
      },
    ]);

    planetController = new PlanetController(planetServiceMock);
  });

  it('should return all planets with their images and astronauts', async () => {
    await planetController.getAll(mockRequest as Request, mockResponse as Response);
    expect(planetServiceMock.getAll).toHaveBeenCalledWith('Earth');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'Earth',
        isHabitable: true,
        description: 'Our planet',
        image: { id: 1, imagePath: 'earth.jpg', imageName: 'Earth' },
        astronauts: [
          { id: 1, firstname: 'John', lastname: 'Doe' },
          { id: 2, firstname: 'Jane', lastname: 'Smith' },
        ],
      },
    ]);
  });
});
