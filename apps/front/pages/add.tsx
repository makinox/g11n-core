import { ButtonOutline, FluidContainer } from '@makinox/makinox-ui';
import Link from 'next/link';

import { AddPageStyles } from '../modules/add/styles/add.styles';
import Navbar from '../common/components/Navbar/Navbar';

const Add = () => {
  const classes = {
    container: 'flex items-center flex-col',
    fieldSet: 'flex flex-col',
    label: 'text-center',
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

          <form className={`${AddPageStyles()} ${classes.fieldSet}`}>
            <fieldset className={classes.fieldSet}>
              <label className={classes.label}>Seleccionar hoja</label>
              <select>
                <option>Main</option>
                <option>mmmm</option>
              </select>
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <label className={classes.label}>Nombre de llave*</label>
              <input type="text" />
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <label className={classes.label}>Valor es*</label>
              <input type="text" />
            </fieldset>
            <fieldset className={classes.fieldSet}>
              <label className={classes.label}>Valor en*</label>
              <input type="text" />
            </fieldset>
          </form>
        </div>
        <div className="flex justify-center">
          <button className={ButtonOutline()}>Agregar elemento</button>
        </div>
      </section>
    </>
  );
};

export default Add;
