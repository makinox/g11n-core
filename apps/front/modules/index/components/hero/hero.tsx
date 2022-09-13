import { useSheet } from '../../../../common/contexts/sheetContext';

const Hero = () => {
  const { languageKeys, languageTuples, sheetTitles } = useSheet();
  console.log({ languageKeys, languageTuples, sheetTitles });
  return (
    <section>
      <div>
        <span>metricas</span>
        <div>
          cuantas traducciones hay
          {languageKeys.map((lang, index) => (
            <span key={index}>{lang}</span>
          ))}
        </div>
        <span>si es posible cuantos usos de api hay</span>
      </div>

      <div>
        <span>hojas disponibles</span>
        <span>espacios sin traducir</span>
      </div>

      <div>
        <span>agregar mas traducciones</span>
      </div>
    </section>
  );
};

export default Hero;
