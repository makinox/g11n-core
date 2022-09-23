import { ButtonOutline } from '@makinox/makinox-ui';
import { useTranslations } from 'next-intl';

import { TranslateTableStyles } from './translateTable.styles';

const TranslateTable = ({
  tableHeaders,
  tableBodyValues,
  onDelete,
}: {
  tableHeaders: Array<string>;
  tableBodyValues: Array<Array<string>>;
  onDelete: (deleteIndex: number) => Promise<Error>;
}) => {
  const t = useTranslations();

  return (
    <table className={TranslateTableStyles()}>
      <thead>
        <tr>
          <th>KEY</th>
          {tableHeaders.map((header) => (
            <th key={header} style={{ textTransform: 'uppercase' }}>
              {header}
            </th>
          ))}
          <th>{t('ACTIONS')}</th>
        </tr>
      </thead>
      <tbody>
        {tableBodyValues.map((rows, idx) => (
          <tr key={rows.length + idx}>
            {rows.map((element) => (
              <td key={element}>{element}</td>
            ))}
            <td>
              <div className="flex justify-center">
                <button className={ButtonOutline()} onClick={() => onDelete(idx)}>
                  {t('DELETE')}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TranslateTable;
