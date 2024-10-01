import Astronaut from './Astronaut';
import Image from './Image';

interface Planet {
  id: number;
  name: string;
  description: string;
  isHabitable: boolean;
  image: Image;
  astronauts: Astronaut[];
}

export default Planet;
