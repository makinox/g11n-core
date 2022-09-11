import { css } from '@stitches/core';

export const NavbarSection = css({
  boxShadow: 'rgb(0 0 0 / 3%) 3px 3px 10px 3px',
  padding: '10px 0',

  '& div:first-of-type svg': {
    height: '47px',
    width: '35px',
  },

  '& div:last-of-type svg': {
    verticalAlign: 'middle',
    height: '20px',
    width: '20px',
    margin: '0 2px',
  },
});
