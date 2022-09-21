import { ButtonOutline } from '@makinox/makinox-ui';

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
  return (
    <table className={TranslateTableStyles()}>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header} style={{ textTransform: 'uppercase' }}>
              {header}
            </th>
          ))}
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
                  DELETE
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
