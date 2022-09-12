import { useSheet } from '../common/contexts/sheetContext';
import Footer from '../common/components/Footer/Footer';
import Navbar from '../common/components/Navbar/Navbar';
import Hero from '../modules/index/components/hero/hero';

const Home = () => {
  const { enviromentData } = useSheet();

  console.log({ enviromentData });

  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
