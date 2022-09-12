// import { getInitializedSheet } from '@g11n-core/generator';

const Hero = (props) => {
  console.log({ props });
  return (
    <section>
      <div>
        <span>metricas</span>
        <span>cuantas traducciones hay</span>
        <span>si es posible cuantos usos de api hay</span>
      </div>

      <div>
        <span>hojas disponibles</span>
      </div>

      <div>
        <span>agregar mas traducciones</span>
      </div>
    </section>
  );
};

// export async function getStaticProps() {
//   const initializedSheet = await getInitializedSheet();

//   return {
//     props: { initializedSheet }, // will be passed to the page component as props
//   };
// }

export default Hero;
