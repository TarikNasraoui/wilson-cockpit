import Planet from './Planet';

interface Astronaut {
  id: number;
  firstname: string;
  lastname: string;
  originPlanet?: Omit<Planet, 'astronauts'>;
}

export default Astronaut;
