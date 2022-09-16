import { FluidContainer, ButtonOutline } from '@makinox/makinox-ui';
import { Fragment, useMemo } from 'react';

import { useSheet } from '../../../../common/contexts/sheetContext';

const Hero = () => {
  const { languageKeys, languageTuples, sheetTitles } = useSheet();

  const totalData = useMemo(() => {
    const languageValues = Object.values(languageTuples);
    const totalTranslationsByLang = languageValues[0] ? Object.values(languageValues[0]).length : 0;

    const totalTranslations: Array<string> = [];
    languageValues.map((languageValue) => {
      const valueKeys = Object.values(languageValue);
      valueKeys.map((value) => totalTranslations.push(value));
    });
    const totalEmptyTranslation = totalTranslations.filter((value) => value && value.length === 0).length;

    return { totalTranslations: totalTranslations.length, totalTranslationsByLang, totalEmptyTranslation };
  }, [languageTuples]);

  return (
    <section className={`flex flex-col ${FluidContainer()}`}>
      <div className="flex justify-around">
        <div>
          <div>
            <span>cuantas traducciones hay:</span>
            <div>
              {languageKeys[0]?.map((lang, index) => (
                <Fragment key={index}>
                  <span>{lang}</span>
                  <span>-</span>
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <span>Hojas disponibles</span>
            <div>
              {sheetTitles.map((titles, index) => (
                <span key={index}>{titles}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span>Total de traducciones: {totalData.totalTranslations}</span>
          <span>Total de traducciones por idioma: {totalData.totalTranslationsByLang}</span>
          <span>Total espacios sin traducir: {totalData.totalEmptyTranslation}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button className={ButtonOutline()}>agregar mas traducciones</button>
      </div>
    </section>
  );
};

export default Hero;
