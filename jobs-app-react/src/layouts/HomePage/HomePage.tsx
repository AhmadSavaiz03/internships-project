import { Carousel } from './components/Carousel';
import { Explore } from './components/Explore';
import { Heros } from './components/Heros';
import { LibraryServices } from './components/LibraryServices';

export const HomePage = () => {
  return (
    <>
      <Explore />
      {/* <Carousel /> */}
      <Heros />
      <LibraryServices />
    </>
  );
};
