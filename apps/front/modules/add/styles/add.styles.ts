import { css } from '@stitches/core';

export const AddPageStyles = css({
  marginBottom: '20px',

  '& fieldset': {
    border: 'none',
  },

  '& label': {
    marginBottom: '5px',
  },

  '& input, & select': {
    boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
    borderRadius: '4px',
    padding: '8px',
    border: 'none',
  },
});
