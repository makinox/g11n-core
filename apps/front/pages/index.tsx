import { GetStaticPropsContext } from 'next';

import Navbar from '../common/components/Navbar/Navbar';
import Hero from '../modules/index/components/hero/hero';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../common/translations/${locale}.json`)).default,
    },
  };
}

export default Home;
