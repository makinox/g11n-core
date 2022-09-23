import { ButtonOutline, FluidContainer } from '@makinox/makinox-ui';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Link from 'next/link';

import TranslateTable from '../../modules/sheet/components/translateTable/translateTable';
import { removeElementResponse } from '../../pages/api/removeElement';
import { useSheet } from '../../common/contexts/sheetContext';
import Navbar from '../../common/components/Navbar/Navbar';
import { networkOrigin, stringSeparators } from '../../common/constants';

const Sheet = () => {
  const { languageTuples, fetchAllData } = useSheet();
  const t = useTranslations();
  const router = useRouter();

  const sheetTitle = router.query['sheetId'] as string;

  const handleDelete = async (deleteIndex: number) => {
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
      keys.forEach((value) => {
        if (!value.includes(sheetTitle)) return;

        const unformattedKey = value.split(stringSeparators.AMPER)[0];
        bodyKeys.add(unformattedKey);
      });
    });

    return [...bodyKeys];
  }, [languageTuples, sheetTitle]);

  const tableBodyValues = useMemo(() => {
    const organizedBodyValues = tableBodyKeys.map((bodyKey) => {
      const reformattedKey = `${bodyKey}${stringSeparators.AMPER}${sheetTitle}`;
      return tableHeaders.map((header) => languageTuples[header][reformattedKey]);
    });
    tableBodyKeys.forEach((bodyKey, index) => organizedBodyValues[index].unshift(bodyKey));

    return organizedBodyValues;
  }, [languageTuples, sheetTitle, tableBodyKeys, tableHeaders]);

  return (
    <>
      <Navbar />
      <section className={FluidContainer()} style={{ marginTop: '20px' }}>
        <div>
          <Link href="/">
            <button className={ButtonOutline()}>{t('INDEX_GO_BACK')}</button>
          </Link>
        </div>
        <div className="flex justify-center">
          <TranslateTable tableHeaders={tableHeaders} tableBodyValues={tableBodyValues} onDelete={handleDelete} />
        </div>
        <div className="flex justify-center">
          <Link href="/add">
            <button className={ButtonOutline()} style={{ marginTop: '20px' }}>
              {t('INDEX_ADD_MORE')}
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { sheetId: 'Any' } }],
    fallback: true,
  };
};

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      messages: (await import(`../../common/translations/${locale}.json`)).default,
    },
  };
};

export default Sheet;
