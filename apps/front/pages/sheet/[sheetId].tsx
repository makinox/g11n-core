import { ButtonOutline, FluidContainer } from '@makinox/makinox-ui';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Link from 'next/link';

import TranslateTable from '../../modules/sheet/components/translateTable/translateTable';
import { removeElementResponse } from '../../pages/api/removeElement';
import { useSheet } from '../../common/contexts/sheetContext';
import Navbar from '../../common/components/Navbar/Navbar';
import { networkOrigin } from '../../common/constants';

const Sheet = () => {
  const { languageTuples, fetchAllData } = useSheet();
  const router = useRouter();

  const handleDelete = async (deleteIndex: number) => {
    const sheetTitle = router.query['sheetId'];
    const response = await fetch(`${networkOrigin}/api/removeElement`, {
      method: 'DELETE',
      body: JSON.stringify({ deleteIndex, sheetTitle }),
    });

    const data: removeElementResponse = await response.json();
    if (response.status !== 200 && 'message' in data) return new Error(data.message);

    fetchAllData();
  };

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
    tableHeaders.push('actions');
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
          <TranslateTable tableHeaders={tableHeaders} tableBodyValues={tableBodyValues} onDelete={handleDelete} />
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
