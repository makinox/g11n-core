import { ButtonOutline } from '@makinox/makinox-ui';

import { removeElementResponse } from '../../../../pages/api/removeElement';
import { TranslateTableStyles } from './translateTable.styles';
import { networkOrigin } from '../../../../common/constants';

const TranslateTable = ({ tableHeaders, tableBodyValues }: { tableHeaders: Array<string>; tableBodyValues: Array<Array<string>> }) => {
  const handleDelete = async (deleteIndex: number) => {
    const response = await fetch(`${networkOrigin}/api/removeElement`, {
      method: 'DELETE',
      body: JSON.stringify({ deleteIndex }),
    });
    const data: removeElementResponse = await response.json();
    if (response.status !== 200 && 'message' in data) return new Error(data.message);
    console.log({ data });
  };

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
                <button className={ButtonOutline()} onClick={() => handleDelete(idx)}>
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
