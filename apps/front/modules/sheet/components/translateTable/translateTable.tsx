import { TranslateTableStyles } from './translateTable.styles';

const TranslateTable = ({ tableHeaders, tableBodyValues }: { tableHeaders: Array<string>; tableBodyValues: Array<Array<string>> }) => {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TranslateTable;
