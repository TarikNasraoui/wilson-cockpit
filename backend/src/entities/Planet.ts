import Astronaut from './Astronaut';

interface Planet {
  id: number;
  name: string;
  description: string;
  isHabitable: boolean;
  image: any;
  astronauts: Astronaut[];
}

export default Planet;
