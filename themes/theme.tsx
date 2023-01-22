import { createTheme } from '@mui/material'

/**
 * @returns <returns the common theme components for the application>
 */

const customTheme = createTheme({
  typography: {
    fontFamily: ['DM Sans'].join('sans-serif'),
  },
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#7D7D8D',
    },
    secondary: {
      main: '#00FFC2 ', //Choose your primary and secondary colors , so you can use <Typography color="primary or color ="secondary"></Typography>
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          //   Some CSS
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '18px',
          background: '#00FFC2',
          borderRadius: '4px',
          color: '#111111',

          '&:hover': {
            backgroundColor: '#00FFC2',
            color: '#111111',
            boxShadow: 20,
          },
          '&.Mui-disabled': {
            color: '#111',
          },
        },
      },
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: 'fullWidth' },
          style: {
            borderBottomWidth: 1,
            borderColor: '#282835',
            ':before': {
              borderBottomWidth: 1,
              borderColor: '#282835',
            },
            ':after': {
              borderBottomWidth: 1,
              borderColor: '#282835',
            },
          },
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
          color: '#FFFFFF',
          backgroundColor: '#7D7D8D',
          border: '1px solid #462C4F',
        },
      },
    },
  },
})

export default customTheme
