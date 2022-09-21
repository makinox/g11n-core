import { ButtonOutline, FluidContainer } from '@makinox/makinox-ui';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';

import { AddPageStyles } from '../modules/add/styles/add.styles';
import { useSheet } from '../common/contexts/sheetContext';
import Navbar from '../common/components/Navbar/Navbar';
import { networkOrigin } from '../common/constants';

const FORM_SHEET_NAME = 'sheetName';
const FORM_KEY_NAME = 'keyName';

const Add = () => {
  const { languageKeys, sheetTitles } = useSheet();
  const [selectedSheet, setSelectedSheet] = useState(0);

  const classes = {
    container: 'flex items-center flex-col',
    fieldSet: 'flex flex-col',
    label: 'text-center',
  };

  const unformatedKeys = useMemo(() => {
    if (!languageKeys) return [];
    return languageKeys[selectedSheet];
  }, [languageKeys, selectedSheet]);

  const currentKeyValue = useMemo(() => {
    if (!unformatedKeys?.length) return [];
    return unformatedKeys?.map((value) => `keyValue-${value}`) || [];
  }, [unformatedKeys]);

  const handleSheetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const optionElement = event.target;
    const { selectedIndex } = optionElement;
    setSelectedSheet(selectedIndex);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = {
      [FORM_SHEET_NAME]: formElement.elements[FORM_SHEET_NAME].value,
      [FORM_KEY_NAME]: formElement.elements[FORM_KEY_NAME].value,
    };
    currentKeyValue.forEach((formKeyValue) =>
      Object.defineProperty(formData, formKeyValue, { enumerable: true, writable: true, value: formElement.elements[formKeyValue].value })
    );
    const response = await fetch(`${networkOrigin}/api/addNewElement`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log({ data });
  };

  return (
    <>
      <Navbar />
      <section className={FluidContainer()} style={{ marginTop: '20px' }}>
        <div>
          <Link href="/">
            <button className={ButtonOutline()}>Ir atras</button>
          </Link>
        </div>
        <div className={classes.container}>
          <h2>Agregar nuevo elemento</h2>

          <form className={`${AddPageStyles()} ${classes.fieldSet}`} onSubmit={handleSubmit}>
            <fieldset className={classes.fieldSet}>
              <label className={classes.label}>Seleccionar hoja</label>
              <select onChange={handleSheetChange} name={FORM_SHEET_NAME}>
                {sheetTitles?.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <label className={classes.label}>Nombre de llave*</label>
              <input type="text" required name={FORM_KEY_NAME} />
            </fieldset>
            {unformatedKeys?.map((langKey, index) => (
              <fieldset key={langKey} className={classes.fieldSet}>
                <label className={classes.label}>Valor {langKey}*</label>
                <input type="text" required name={currentKeyValue[index]} />
              </fieldset>
            ))}
            <fieldset>
              <button type="submit" className={ButtonOutline()}>
                Agregar elemento
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
};

export default Add;
