import { ButtonOutline, FluidContainer } from '@makinox/makinox-ui';
import { useMemo } from 'react';
import Link from 'next/link';

import TranslateTable from '../../modules/sheet/components/translateTable/translateTable';
import { useSheet } from '../../common/contexts/sheetContext';
import Navbar from '../../common/components/Navbar/Navbar';

const Sheet = () => {
  const { languageTuples } = useSheet();

  const tableHeaders = useMemo(() => {
    return Object.keys(languageTuples) || [];
  }, [languageTuples]);

  const tableBodyKeys = useMemo(() => {
    const bodyKeys: Set<string> = new Set();
    Object.values(languageTuples).forEach((tuples) => {
      const keys = Object.keys(tuples);
      keys.forEach((value) => bodyKeys.add(value));
    });

    return [...bodyKeys];
  }, [languageTuples]);

  const tableBodyValues = useMemo(() => {
    const organizedBodyValues = tableBodyKeys.map((bodyKey) => tableHeaders.map((header) => languageTuples[header][bodyKey]));
    tableBodyKeys.forEach((bodyKey, index) => organizedBodyValues[index].unshift(bodyKey));
    tableHeaders.unshift('key');
    return organizedBodyValues;
  }, [languageTuples, tableBodyKeys, tableHeaders]);

  return (
    <>
      <Navbar />
      <section className={FluidContainer()} style={{ marginTop: '20px' }}>
        <div>
          <Link href="/">
            <button className={ButtonOutline()}>Ir atras</button>
          </Link>
        </div>
        <div className="flex justify-center">
          <TranslateTable tableHeaders={tableHeaders} tableBodyValues={tableBodyValues} />
        </div>
        <div className="flex justify-center">
          <Link href="/add">
            <button className={ButtonOutline()} style={{ marginTop: '20px' }}>
              agregar mas traducciones
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Sheet;
