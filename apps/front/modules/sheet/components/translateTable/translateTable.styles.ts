import { css } from '@stitches/core';

export const TranslateTableStyles = css({
  borderRadius: '4px',
  backgroundColor: 'rgb(var(--light-background))',
  boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
  marginTop: '50px',

  '& thead th': {
    padding: '10px 0',
    borderBottom: '1px solid rgb(var(--light-surface))',
  },

  '& tbody td': {
    padding: '5px 10px',
  },

  '& tbody tr:nth-child(even) td': {
    backgroundColor: 'rgb(var(--light-surface))',
  },
});
